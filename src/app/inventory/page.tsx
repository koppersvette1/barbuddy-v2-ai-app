
"use client";

import { useState, useTransition } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/settings-context';
import { inventoryScanningFromImage } from '@/ai/flows/inventory-scanning-from-image';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Loader, ScanLine, X, Info } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function ImageUploader({ onImageUpload, isPending }: { onImageUpload: (dataUri: string) => void; isPending: boolean; }) {
  const [preview, setPreview] = useState<string | null>(null);
  const placeholder = PlaceHolderImages.find(img => img.id === 'inventory-scan-placeholder');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClear = () => {
    setPreview(null);
  };

  return (
    <div className="relative border-2 border-dashed border-border rounded-lg p-4 text-center aspect-video flex flex-col justify-center items-center overflow-hidden">
      {preview ? (
        <div className="absolute inset-0">
          <Image src={preview} alt="Inventory preview" layout="fill" objectFit="cover" className="rounded-md" />
           <div className="absolute inset-0 bg-black/20" />
           <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={handleClear}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : placeholder && (
        <div className="absolute inset-0 opacity-20">
          <Image src={placeholder.imageUrl} alt={placeholder.description} layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-2 text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
        <ScanLine className="w-12 h-12" />
        <p className="font-semibold">Scan an image of your bar to add ingredients.</p>
        <Button variant="secondary" asChild>
          <label htmlFor="image-upload" className="cursor-pointer">
            {isPending ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : 'Select Image'}
          </label>
        </Button>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isPending} />
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const { settings, setInventory } = useSettings();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [manualIngredient, setManualIngredient] = useState('');

  const handleImageScan = (photoDataUri: string) => {
    startTransition(async () => {
      const result = await inventoryScanningFromImage({ photoDataUri });
      if (result?.ingredients) {
        const newInventory = [...new Set([...settings.inventory, ...result.ingredients])];
        setInventory(newInventory);
        toast({
          title: 'Scan Complete!',
          description: `Added ${result.ingredients.length} new items to your inventory.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: 'Scan Failed',
          description: 'Could not identify ingredients from the image.',
        });
      }
    });
  };
  
  const handleAddIngredient = () => {
    if (manualIngredient.trim() && !settings.inventory.includes(manualIngredient.trim())) {
      setInventory([...settings.inventory, manualIngredient.trim()]);
      setManualIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setInventory(settings.inventory.filter(item => item !== ingredientToRemove));
  };

  return (
    <div className="flex flex-col">
      <Header title="My Inventory" />
      <main className="p-6 grid gap-6 md:grid-cols-1">
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Scan Your Bar</CardTitle>
                <CardDescription>Use your camera to automatically add ingredients to your inventory.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader onImageUpload={handleImageScan} isPending={isPending} />
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Manage Ingredients</CardTitle>
                <CardDescription>Manually add or remove items from your virtual bar.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="e.g., Bulleit Bourbon"
                    value={manualIngredient}
                    onChange={(e) => setManualIngredient(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                  />
                  <Button onClick={handleAddIngredient}>Add</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">Your Items:</h3>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-background/50">
                    {settings.inventory.length > 0 ? (
                      settings.inventory.map((item) => (
                        <Badge key={item} variant="secondary" className="text-sm font-normal group relative pr-7">
                          {item}
                          <button onClick={() => handleRemoveIngredient(item)} className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full opacity-50 group-hover:opacity-100 hover:bg-destructive/20 p-0.5">
                             <X className="w-3 h-3 text-destructive" />
                          </button>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground px-1">Your inventory is empty.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads Up: Shelf Life</AlertTitle>
            <AlertDescription>
                Remember to refrigerate items like Vermouth and Lillet Blanc after opening. As fortified wines, they can spoil over time. Using them within a month or two ensures the best taste for your cocktails.
            </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
