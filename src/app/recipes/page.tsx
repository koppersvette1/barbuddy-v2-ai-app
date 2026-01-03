import { Header } from "@/components/layout/header";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/lib/recipes";

export default function RecipesPage() {
  return (
    <div className="flex flex-col">
      <Header title="Cocktail Recipes" />
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
