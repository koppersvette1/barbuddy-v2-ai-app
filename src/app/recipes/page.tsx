
"use client";

import { useState, useTransition } from "react";
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { RecipeCard } from "@/components/recipe-card";
import { recipes as defaultRecipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";
import { generateRecipesFromInventory } from "@/ai/flows/generate-recipes-from-inventory";
import { Loader, Sparkles, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const { settings } = useSettings();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[] | null>(null);
  const [unlockSuggestion, setUnlockSuggestion] = useState<{ ingredient: string; unlockedRecipes: string[] } | null>(null);

  const allRecipes = [...defaultRecipes, ...settings.customRecipes];

  const handleGenerateRecipes = () => {
    if (settings.inventory.length === 0) {
      toast({
        title: "Your bar is empty!",
        description: "Add some ingredients to your inventory first.",
      });
      return;
    }

    startTransition(async () => {
      setGeneratedRecipes(null);
      setUnlockSuggestion(null);

      const result = await generateRecipesFromInventory({ inventory: settings.inventory });
      if (result.recipes && result.recipes.length > 0) {
        const foundRecipes = allRecipes.filter(r => result.recipes.includes(r.name));
        setGeneratedRecipes(foundRecipes);
        toast({
          title: "Cheers!",
          description: `Found ${foundRecipes.length} cocktails you can make.`,
        });
      } else if (result.unlockSuggestion) {
        setGeneratedRecipes([]);
        setUnlockSuggestion(result.unlockSuggestion);
        toast({
            title: "Unlock New Cocktails!",
            description: `You're just one ingredient away from more recipes.`,
        });
      } else {
        setGeneratedRecipes([]);
        toast({
          variant: "default",
          title: "No matches yet",
          description: "Couldn't find any recipes with your current inventory. Try adding more ingredients!",
        });
      }
    });
  };

  const filteredAndSortedRecipes = allRecipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === 'category') {
        return a.category.localeCompare(b.category) || a.name.localeCompare(a.name);
      }
      // sort custom recipes to the top
      if (a.custom && !b.custom) return -1;
      if (!a.custom && b.custom) return 1;
      return 0;
    });

  const recipesByCategory = filteredAndSortedRecipes.reduce((acc, recipe) => {
    const category = recipe.custom ? 'My Custom Recipes' : recipe.category;
    (acc[category] = acc[category] || []).push(recipe);
    return acc;
  }, {} as Record<string, Recipe[]>);

  const categoryOrder: string[] = ['My Custom Recipes', 'Spirit Forward', 'Sours', 'Highballs & Spritzes', 'Tiki, Tropical & Dessert'];

  return (
    <div className="flex flex-col">
      <Header title="Cocktail Recipes" />
      <main className="p-6">
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> My Recipes
          </h2>
          <p className="text-muted-foreground mb-4">
            Let BarBuddy suggest cocktails you can make with the ingredients you already have.
          </p>
          <Button onClick={handleGenerateRecipes} disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate From My Inventory"
            )}
          </Button>

          {generatedRecipes && (
            <div className="mt-6">
              <Separator className="my-4" />
              {generatedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {generatedRecipes.map((recipe) => (
                    <RecipeCard key={recipe.slug} recipe={recipe} />
                  ))}
                </div>
              ) : unlockSuggestion ? (
                 <Card className="mt-4 bg-background/50 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">Taste Architect Suggestion</CardTitle>
                        <CardDescription>
                            You're close! Grab a bottle of <strong className="text-foreground">{unlockSuggestion.ingredient}</strong> next time you're out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">Adding it to your bar would instantly unlock these cocktails:</p>
                        <div className="flex flex-wrap gap-2">
                            {unlockSuggestion.unlockedRecipes.map(name => (
                                <Badge key={name} variant="secondary">{name}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
              ) : (
                <p className="text-center text-muted-foreground py-4">No simple recipe matches found with your current inventory.</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-grow">
                        <Input
                        placeholder="Search all recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/add-recipe" className="flex items-center gap-2">
                            <PlusCircle className="w-4 h-4" /> Add Recipe
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="space-y-10">
                    {categoryOrder.map(category => {
                        const categoryRecipes = recipesByCategory[category];
                        if (!categoryRecipes || categoryRecipes.length === 0) return null;

                        return (
                        <section key={category}>
                            <h2 className="text-2xl font-bold text-primary mb-4 pb-2 border-b border-border">{category}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categoryRecipes.map((recipe) => (
                                <RecipeCard key={recipe.slug} recipe={recipe} />
                            ))}
                            </div>
                        </section>
                        );
                    })}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
