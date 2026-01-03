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

const GenerateRecipesFromInventoryInputSchema = z.object({
  inventory: z.array(z.string()).describe('A list of ingredients in the user\'s inventory.'),
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
  // TODO: Replace this with actual recipe retrieval logic
  // For now, return a hardcoded list of recipes if certain ingredients are present
  if (input.ingredients.includes('Whiskey') && input.ingredients.includes('Demerara Syrup') && input.ingredients.includes('Angostura Bitters')) {
    return ['Old Fashioned'];
  }
  if (input.ingredients.includes('Gin') && input.ingredients.includes('Campari') && input.ingredients.includes('Sweet Vermouth')) {
    return ['Negroni'];
  }
  if (input.ingredients.includes('Tequila') && input.ingredients.includes('Lime') && input.ingredients.includes('Triple Sec')) {
    return ['Margarita'];
  }
  return [];
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
