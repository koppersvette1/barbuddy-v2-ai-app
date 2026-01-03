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
import { Loader, ScanLine, Trash2, X } from 'lucide-react';
import Image from 'next/image';

function ImageUploader({ onImageUpload, isPending }: { onImageUpload: (dataUri: string) => void; isPending: boolean; }) {
  const [preview, setPreview] = useState<string | null>(null);

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
    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
      {preview ? (
        <div className="relative">
          <Image src={preview} alt="Inventory preview" width={400} height={300} className="rounded-md mx-auto" />
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/50 hover:bg-background" onClick={handleClear}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <ScanLine className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground">Drag & drop an image of your bar, or click to upload.</p>
          <Button variant="outline" asChild>
            <label htmlFor="image-upload" className="cursor-pointer">
              {isPending ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : 'Select Image'}
            </label>
          </Button>
          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isPending} />
        </div>
      )}
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
      <main className="p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scan Your Bar</CardTitle>
            <CardDescription>Use your camera to automatically add ingredients to your inventory.</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader onImageUpload={handleImageScan} isPending={isPending} />
          </CardContent>
        </Card>
        <Card>
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
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {settings.inventory.length > 0 ? (
                  settings.inventory.map((item) => (
                    <Badge key={item} variant="secondary" className="text-sm font-normal group relative pr-7">
                      {item}
                      <button onClick={() => handleRemoveIngredient(item)} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full opacity-50 group-hover:opacity-100 hover:bg-destructive/20">
                         <X className="w-3 h-3 text-destructive" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Your inventory is empty.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
