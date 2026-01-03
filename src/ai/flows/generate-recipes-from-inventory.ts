'use server';

/**
 * @fileOverview Generates cocktail recipes based on the user's scanned inventory.
 *
 * - generateRecipesFromInventory - A function that generates cocktail recipes.
 * - GenerateRecipesFromInventoryInput - The input type for the generateRecipesFromInventory function.
 * - GenerateRecipesFromInventoryOutput - The return type for the generateRecipesFromInventory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recipes as allRecipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/types';

const GenerateRecipesFromInventoryInputSchema = z.object({
  inventory: z.array(z.string()).describe("A list of ingredients in the user's inventory."),
});
export type GenerateRecipesFromInventoryInput = z.infer<typeof GenerateRecipesFromInventoryInputSchema>;

const GenerateRecipesFromInventoryOutputSchema = z.object({
  recipes: z.array(z.string()).describe('A list of cocktail recipes that can be made with the given inventory.'),
});
export type GenerateRecipesFromInventoryOutput = z.infer<typeof GenerateRecipesFromInventoryOutputSchema>;

export async function generateRecipesFromInventory(input: GenerateRecipesFromInventoryInput): Promise<GenerateRecipesFromInventoryOutput> {
  return generateRecipesFromInventoryFlow(input);
}

const findRecipesTool = ai.defineTool({
  name: 'findRecipes',
  description: 'Finds cocktail recipes based on a list of ingredients.',
  inputSchema: z.object({
    ingredients: z.array(z.string()).describe('A list of ingredients to find recipes for.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of cocktail recipes that can be made with the given ingredients.'),
}, async (input) => {
  const inventorySet = new Set(input.ingredients.map(i => i.toLowerCase()));
  const matchedRecipes: string[] = [];

  allRecipes.forEach((recipe: Recipe) => {
    const requiredIngredients = recipe.spec.ingredients.map(ing => ing.item.toLowerCase());
    const canMake = requiredIngredients.every(req => {
      // Check if any inventory item contains the required ingredient as a substring
      // This allows "Bulleit Bourbon" to satisfy a requirement for "Bourbon"
      return Array.from(inventorySet).some(invItem => invItem.includes(req));
    });

    if (canMake) {
      matchedRecipes.push(recipe.name);
    }
  });

  return matchedRecipes;
});

const prompt = ai.definePrompt({
  name: 'generateRecipesFromInventoryPrompt',
  input: {schema: GenerateRecipesFromInventoryInputSchema},
  output: {schema: GenerateRecipesFromInventoryOutputSchema},
  tools: [findRecipesTool],
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect.  Based on the user's inventory, suggest cocktail recipes that they can make.

  The user's inventory is:
  {{#each inventory}}
  - {{{this}}}
  {{/each}}

  Use the findRecipes tool to identify which recipes the user can make with their current inventory.
  If the tool returns recipes, present them to the user in the output. If the tool returns an empty list, inform the user that no recipes could be made with their current inventory and suggest they add more items.
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
    return output!;
  }
);
