
'use server';

/**
 * @fileOverview Generates cocktail recipes based on the user's scanned inventory and suggests new ingredients to unlock more recipes.
 *
 * - generateRecipesFromInventory - A function that generates cocktail recipes.
 * - GenerateRecipesFromInventoryInput - The input type for the generateRecipesFromInventory function.
 * - GenerateRecipesFromInventoryOutput - The return type for the generateRecipesFrom-inventory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recipes as allRecipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/types';

const GenerateRecipesFromInventoryInputSchema = z.object({
  inventory: z.array(z.string()).describe("A list of ingredients in the user's inventory."),
  preferences: z.array(z.string()).optional().describe("A list of user's favorited cocktail names to infer taste preferences."),
});
export type GenerateRecipesFromInventoryInput = z.infer<typeof GenerateRecipesFromInventoryInputSchema>;

const UnlockSuggestionSchema = z.object({
    ingredient: z.string().describe("The single ingredient the user should buy."),
    unlockedRecipes: z.array(z.string()).describe("A list of 2-3 new cocktail names that this single ingredient purchase will unlock."),
});

const GenerateRecipesFromInventoryOutputSchema = z.object({
  recipes: z.array(z.string()).describe('A list of cocktail recipes that can be made with the given inventory.'),
  unlockSuggestion: UnlockSuggestionSchema.optional().describe("A suggestion for a single ingredient to purchase that would unlock the most new recipes."),
});
export type GenerateRecipesFromInventoryOutput = z.infer<typeof GenerateRecipesFromInventoryOutputSchema>;

export async function generateRecipesFromInventory(input: GenerateRecipesFromInventoryInput): Promise<GenerateRecipesFromInventoryOutput> {
  return generateRecipesFromInventoryFlow(input);
}

const findRecipesTool = ai.defineTool({
  name: 'findRecipesAndSuggestions',
  description: 'Finds cocktail recipes based on a list of ingredients and suggests an ingredient to unlock more.',
  inputSchema: z.object({
    inventory: z.array(z.string()).describe('A list of ingredients to find recipes for.'),
  }),
  outputSchema: z.object({
    makeable: z.array(z.string()).describe("An array of recipe names that can be made with the current inventory."),
    unlockSuggestion: UnlockSuggestionSchema.optional().describe("A suggestion for a single ingredient that unlocks the most new recipes."),
  }),
}, async (input) => {
  const inventorySet = new Set(input.inventory.map(i => i.toLowerCase()));
  const makeable: string[] = [];

  // Find makeable recipes
  allRecipes.forEach((recipe: Recipe) => {
    const requiredIngredients = recipe.spec.ingredients.map(ing => ing.item.toLowerCase());
    const canMake = requiredIngredients.every(req => Array.from(inventorySet).some(invItem => invItem.includes(req) || req.includes(invItem)));
    if (canMake) {
      makeable.push(recipe.name);
    }
  });

  // If we can already make things, we don't need to suggest unlocks yet.
  if (makeable.length > 0) {
    return { makeable };
  }

  // Logic to find the best ingredient to unlock more recipes
  const missingIngredientsCount: Record<string, { unlocked: Set<string> }> = {};
  const allIngredients = new Set<string>();
  allRecipes.forEach(r => r.spec.ingredients.forEach(i => allIngredients.add(i.item)));

  for (const ingredient of allIngredients) {
    if (inventorySet.has(ingredient.toLowerCase())) continue;

    const newInventory = new Set([...inventorySet, ingredient.toLowerCase()]);
    let unlockedCount = 0;
    const unlockedRecipes = new Set<string>();

    allRecipes.forEach(recipe => {
      // Exclude recipes we can already make (though this is 0 in this branch)
      if (makeable.includes(recipe.name)) return;
      
      const canMakeWithNew = recipe.spec.ingredients
        .map(i => i.item.toLowerCase())
        .every(req => Array.from(newInventory).some(invItem => invItem.includes(req) || req.includes(invItem)));
      
      if (canMakeWithNew) {
        unlockedRecipes.add(recipe.name);
      }
    });

    if (unlockedRecipes.size > 0) {
      missingIngredientsCount[ingredient] = { unlocked: unlockedRecipes };
    }
  }

  let bestUnlock: { ingredient: string; unlocked: Set<string> } | null = null;
  for (const ingredient in missingIngredientsCount) {
    if (!bestUnlock || missingIngredientsCount[ingredient].unlocked.size > bestUnlock.unlocked.size) {
      bestUnlock = { ingredient, unlocked: missingIngredientsCount[ingredient].unlocked };
    }
  }
  
  if (bestUnlock) {
    return {
      makeable,
      unlockSuggestion: {
        ingredient: bestUnlock.ingredient,
        unlockedRecipes: Array.from(bestUnlock.unlocked).slice(0, 3) // Limit to 3 for brevity
      }
    }
  }
  
  return { makeable };
});


const prompt = ai.definePrompt({
  name: 'generateRecipesFromInventoryPrompt',
  input: {schema: GenerateRecipesFromInventoryInputSchema},
  output: {schema: GenerateRecipesFromInventoryOutputSchema},
  tools: [findRecipesTool],
  prompt: `You are BarBuddy, a creative "Taste Architect." Your goal is to help the user discover what they can create with their bar inventory and guide them on how to expand their capabilities.

You will be given the user's current inventory.
1.  Use the 'findRecipesAndSuggestions' tool to determine:
    a. Which standard recipes can be made with the provided inventory.
    b. If no recipes can be made, what single ingredient purchase would unlock the most new recipes.

2.  If the tool returns one or more makeable recipe names, present these to the user in the 'recipes' output field.

3.  If the tool returns an empty list of makeable recipes but provides an 'unlockSuggestion', present this suggestion. Frame it as a helpful tip, using flavor-forward language to connect it to the user's potential preferences. For example: *"Since you enjoy [Flavor Profile from a likely-enjoyed drink], your best unlock is **[Ingredient]**. This opens up cocktails like the [Recipe 1], which matches your preference for [Flavor Profile] drinks."* If the user's preferences are available, use them to make the connection even stronger. This is the "Proactive Unlock" feature.

4.  If no recipes can be made and no unlock suggestion is found, return an empty 'recipes' array. This indicates the user's inventory is too sparse to make a reasonable recommendation.
  
User's Inventory:
{{#each inventory}}
- {{{this}}}
{{/each}}
`,
});

const generateRecipesFromInventoryFlow = ai.defineFlow(
  {
    name: 'generateRecipesFromInventoryFlow',
    inputSchema: GenerateRecipesFromInventoryInputSchema,
    outputSchema: GenerateRecipesFromInventoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { recipes: [] };
    }
    return output;
  }
);
