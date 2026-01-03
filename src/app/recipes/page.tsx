
"use client";

import { useState, useTransition } from "react";
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";
import { generateRecipesFromInventory } from "@/ai/flows/generate-recipes-from-inventory";
import { Loader, Sparkles, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const { settings } = useSettings();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[] | null>(null);

  const handleGenerateRecipes = () => {
    if (settings.inventory.length === 0) {
      toast({
        title: "Your bar is empty!",
        description: "Add some ingredients to your inventory first.",
      });
      return;
    }

    startTransition(async () => {
      const result = await generateRecipesFromInventory({ inventory: settings.inventory });
      if (result.recipes && result.recipes.length > 0) {
        const foundRecipes = recipes.filter(r => result.recipes.includes(r.name));
        setGeneratedRecipes(foundRecipes);
        toast({
          title: "Cheers!",
          description: `Found ${foundRecipes.length} cocktails you can make.`,
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

  const filteredAndSortedRecipes = recipes
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
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="flex flex-col">
      <Header title="Cocktail Recipes" />
      <main className="p-6">
        <div className="bg-card border rounded-lg p-6 mb-6">
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
              ) : (
                <p className="text-center text-muted-foreground">No recipes found with your current ingredients.</p>
              )}
            </div>
          )}
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
