"use client";

import { useState, useTransition, use } from 'react';
import { notFound } from 'next/navigation';
import { recipes } from '@/lib/recipes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/settings-context';
import { useToast } from '@/hooks/use-toast';
import { Flame, GlassWater, Loader, Utensils, Replace, Info, Baby } from 'lucide-react';
import { suggestFoodPairing } from '@/ai/flows/suggest-food-pairing';
import { suggestWoodPairing } from '@/ai/flows/suggest-wood-pairing';
import { suggestCocktailSubstitutions } from '@/ai/flows/suggest-cocktail-substitutions';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type AIResult = {
  title: string;
  content: string;
  rationale?: string;
};

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const [isPending, startTransition] = useTransition();
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const { settings } = useSettings();
  const { toast } = useToast();

  const recipe = recipes.find(r => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  const recipeImage = PlaceHolderImages.find(img => img.id === recipe.image) || PlaceHolderImages.find(img => img.id === 'default-cocktail');

  const handleFoodPairing = () => {
    startTransition(async () => {
      setAiResult(null);
      const result = await suggestFoodPairing({ cocktailName: recipe.name });
      if (result?.foodPairingSuggestion) {
        setAiResult({ title: 'Food Pairing Suggestion', content: result.foodPairingSuggestion });
      } else {
        toast({ variant: 'destructive', title: 'Could not get suggestion.' });
      }
    });
  };

  const handleWoodPairing = () => {
    startTransition(async () => {
      setAiResult(null);
      const ingredients = recipe.spec.ingredients.map(i => i.item).join(', ');
      const spirit = recipe.spec.ingredients[0].item;
      const result = await suggestWoodPairing({ cocktailName: recipe.name, cocktailIngredients: ingredients, spiritType: spirit });
      if (result) {
        setAiResult({ title: 'Wood Pairing Suggestion', content: result.woodSuggestion, rationale: result.rationale });
      } else {
        toast({ variant: 'destructive', title: 'Could not get suggestion.' });
      }
    });
  };
  
  const handleSubstitutions = () => {
     if (settings.inventory.length === 0) {
      toast({ variant: 'default', title: 'Inventory Empty', description: 'Add items to your inventory to get substitution ideas.' });
      return;
    }
    startTransition(async () => {
      setAiResult(null);
      const result = await suggestCocktailSubstitutions({ cocktailName: recipe.name, userInventory: settings.inventory });
      if (result) {
        setAiResult({ title: 'Substitution Suggestions', content: result.suggestedSubstitutions.join(', '), rationale: result.reasoning });
      } else {
        toast({ variant: 'destructive', title: 'Could not get substitution ideas.' });
      }
    });
  };


  return (
    <div className="flex flex-col">
      <Header title={recipe.name} />
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                {recipeImage && (
                  <Image
                    src={recipeImage.imageUrl}
                    alt={recipe.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                    data-ai-hint={recipeImage.imageHint}
                  />
                )}
              </CardContent>
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.category}</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="mt-6">
              <CardHeader><CardTitle>AI-Powered Suggestions</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button onClick={handleFoodPairing} disabled={isPending} variant="outline"><Utensils className="mr-2" /> Food Pairing</Button>
                {settings.hasSmoker && <Button onClick={handleWoodPairing} disabled={isPending} variant="outline"><Flame className="mr-2" /> Smoke Pairing</Button>}
                <Button onClick={handleSubstitutions} disabled={isPending} variant="outline"><Replace className="mr-2"/> Substitutions</Button>
              </CardContent>
            </Card>

            {isPending && <div className="mt-6 flex justify-center items-center gap-2 text-muted-foreground"><Loader className="animate-spin" /> Generating...</div>}
            
            {aiResult && (
              <Card className="mt-6">
                <CardHeader><CardTitle>{aiResult.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">{aiResult.content}</p>
                  {aiResult.rationale && <p className="mt-2 text-muted-foreground italic">"{aiResult.rationale}"</p>}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="recipe" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="recipe" disabled={!settings.showAlcohol}>Recipe</TabsTrigger>
                <TabsTrigger value="swap">Swaps</TabsTrigger>
                <TabsTrigger value="mocktail" disabled={!settings.showMocktails}>Mocktail</TabsTrigger>
                <TabsTrigger value="kid" disabled={!settings.showKids}>For Kids</TabsTrigger>
              </TabsList>

              <TabsContent value="recipe">
                 <Card>
                    <CardHeader><CardTitle>Ingredients</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                        {recipe.spec.ingredients.map((ing, i) => (
                            <li key={i} className="flex justify-between">
                            <span>{ing.item}</span>
                            <span className="text-muted-foreground">{ing.amount}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    <Separator/>
                    <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-3">
                        {recipe.spec.instructions.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="swap">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Info /> Substitution Idea</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-lg">{recipe.swap}</p>
                    <p className="text-sm text-muted-foreground mt-2">A great alternative if you're missing the primary spirit.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mocktail">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><GlassWater /> {recipe.mocktail.name} (0% ABV)</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-lg">{recipe.mocktail.recipe}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kid">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Baby /> {recipe.kid.name}</CardTitle></CardHeader>
                  <CardContent>
                     <p className="text-lg">{recipe.kid.recipe}</p>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
