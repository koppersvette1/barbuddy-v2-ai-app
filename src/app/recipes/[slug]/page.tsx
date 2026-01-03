
"use client";

import { useState, useTransition, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { recipes } from '@/lib/recipes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/settings-context';
import { useToast } from '@/hooks/use-toast';
import { Flame, GlassWater, Loader, Utensils, Replace, Info, Baby, GraduationCap, ChevronsRight, Beaker, TestTube, FlaskConical } from 'lucide-react';
import { suggestFoodPairing } from '@/ai/flows/suggest-food-pairing';
import { suggestWoodPairing } from '@/ai/flows/suggest-wood-pairing';
import { suggestCocktailSubstitutions, SuggestCocktailSubstitutionsOutput } from '@/ai/flows/suggest-cocktail-substitutions';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type AIResult = {
  title: string;
  content: string;
  rationale?: string;
  substitutions?: SuggestCocktailSubstitutionsOutput['substitutions'];
};

export default function RecipeDetailPage({ params: paramsPromise }: { params: { slug: string } }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const { settings } = useSettings();
  const { toast } = useToast();
  const [servings, setServings] = useState(1);

  const allRecipes = [...recipes, ...settings.customRecipes];
  const recipe = allRecipes.find(r => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }
  
  const recipeImage = recipe.imageDataUri 
    ? { imageUrl: recipe.imageDataUri, imageHint: recipe.imageHint || 'custom cocktail' }
    : PlaceHolderImages.find(img => img.id === recipe.image) || PlaceHolderImages.find(img => img.id === 'default-cocktail');

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
      if (result && result.substitutions.length > 0) {
        setAiResult({ title: 'Substitution Suggestions', content: result.notes || "", substitutions: result.substitutions });
      } else {
        toast({ title: 'No simple substitutions found.', description: 'Your inventory has what it needs or substitutions are not recommended.' });
        setAiResult(null);
      }
    });
  };

  const hasAdvancedTechnique = ['Whiskey Sour', 'Gin Fizz', 'Clover Club'].includes(recipe.name);

  const techniqueMap = {
    'Fat Washing': { icon: Beaker, link: '/learn' },
    'Spirit Infusions': { icon: FlaskConical, link: '/learn'},
    'Clarified Milk Punch': { icon: TestTube, link: '/learn'},
    'Dry Shake': { icon: GraduationCap, link: '/learn'}
  }

  const getTechniqueInfo = (name: string) => {
    for (const key in techniqueMap) {
      if (name.includes(key)) {
        return techniqueMap[key as keyof typeof techniqueMap];
      }
    }
    return null;
  }
  
  const servingsMap: {[key: number]: number} = {
    1: 1,
    2: 5,
    3: 10,
    4: 20,
  }

  const handleServingsChange = (value: number[]) => {
    setServings(servingsMap[value[0]]);
  }

  const parseAmount = (amount: string): [number, string] => {
    const parts = amount.split(' ');
    if (parts.length === 2 && !isNaN(parseFloat(parts[0]))) {
      return [parseFloat(parts[0]), parts[1]];
    }
    return [0, amount];
  }

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
                  {aiResult.substitutions ? (
                    <div className="space-y-4">
                      {aiResult.substitutions.map((sub, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between text-sm">
                            <Badge variant="outline" className="line-through">{sub.missingIngredient}</Badge>
                            <ChevronsRight className="h-4 w-4 text-muted-foreground mx-2" />
                            <Badge variant="secondary">{sub.suggestedIngredient}</Badge>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground italic">"{sub.reasoning}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-primary">{aiResult.content}</p>
                      {aiResult.rationale && <p className="mt-2 text-muted-foreground italic">"{aiResult.rationale}"</p>}
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="recipe" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="recipe">Recipe</TabsTrigger>
                <TabsTrigger value="swap">Swaps</TabsTrigger>
                <TabsTrigger value="mocktail">Mocktail</TabsTrigger>
                <TabsTrigger value="kid">For Kids</TabsTrigger>
              </TabsList>

              <TabsContent value="recipe">
                 <Card>
                    <CardHeader>
                      <CardTitle>Ingredients</CardTitle>
                      <div className="pt-4 space-y-4">
                        <Label htmlFor="servings-slider">Servings: {servings}</Label>
                        <div className='flex items-center gap-4'>
                          <span className="text-xs text-muted-foreground">1</span>
                          <Slider
                            id="servings-slider"
                            min={1}
                            max={4}
                            step={1}
                            defaultValue={[1]}
                            onValueChange={handleServingsChange}
                          />
                          <span className="text-xs text-muted-foreground">20</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                        {recipe.spec.ingredients.map((ing, i) => {
                          const [amount, unit] = parseAmount(ing.amount);
                          const scaledAmount = amount * servings;
                          return (
                            <li key={i} className="flex justify-between">
                              <span>{ing.item}</span>
                              <span className="text-muted-foreground">{scaledAmount > 0 ? `${scaledAmount} ${unit}` : unit}</span>
                            </li>
                          );
                        })}
                        </ul>
                    </CardContent>
                    <Separator/>
                    <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-outside space-y-3 pl-4">
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
            
            {hasAdvancedTechnique && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><GraduationCap /> Masterclass: The Dry Shake</CardTitle>
                  <CardDescription>This cocktail uses an egg white (or aquafaba) to create a rich, silky foam. Mastering the "Dry Shake" is key to getting that perfect texture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary">The "Why"</h3>
                    <p className="text-muted-foreground">Shaking without ice first (dry shake) allows the proteins in the egg white to unwind and trap air, creating a stable foam. Shaking with ice *after* chills the drink without over-diluting it.</p>
                  </div>
                   <Button asChild variant="outline">
                    <Link href="/learn">
                      Explore More Techniques <ChevronsRight className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

