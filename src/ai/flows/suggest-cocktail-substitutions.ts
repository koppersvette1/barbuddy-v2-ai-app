'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting cocktail ingredient substitutions based on user inventory.
 *
 * - suggestCocktailSubstitutions - A function that takes a cocktail name and user inventory, and returns suggested substitutions.
 * - SuggestCocktailSubstitutionsInput - The input type for the suggestCocktailSubstitutions function.
 * - SuggestCocktailSubstitutionsOutput - The return type for the suggestCocktailSubstitutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCocktailSubstitutionsInputSchema = z.object({
  cocktailName: z.string().describe('The name of the cocktail to make.'),
  userInventory: z.array(z.string()).describe('The list of ingredients in the user\'s inventory.'),
});
export type SuggestCocktailSubstitutionsInput = z.infer<typeof SuggestCocktailSubstitutionsInputSchema>;

const SuggestCocktailSubstitutionsOutputSchema = z.object({
  suggestedSubstitutions: z.array(z.string()).describe('The list of suggested ingredient substitutions.'),
  reasoning: z.string().describe('Explanation of why the substitutions were suggested.')
});
export type SuggestCocktailSubstitutionsOutput = z.infer<typeof SuggestCocktailSubstitutionsOutputSchema>;

export async function suggestCocktailSubstitutions(input: SuggestCocktailSubstitutionsInput): Promise<SuggestCocktailSubstitutionsOutput> {
  return suggestCocktailSubstitutionsFlow(input);
}

const canSubstitute = ai.defineTool({
  name: 'canSubstitute',
  description: 'Checks if there is a good substitute ingredient in the user inventory for a missing ingredient in a cocktail recipe.',
  inputSchema: z.object({
    missingIngredient: z.string().describe('The ingredient that is missing from the cocktail recipe.'),
    userInventory: z.array(z.string()).describe('The list of ingredients in the user\'s inventory.'),
    cocktailName: z.string().describe('The name of the cocktail to make.')
  }),
  outputSchema: z.object({
    hasSubstitution: z.boolean().describe('Whether or not a good substitute is available.'),
    substitution: z.string().optional().describe('The substitute ingredient if available.')
  }),
}, async (input) => {
  // This is a placeholder implementation.
  // In a real application, this would use a more sophisticated logic
  // to determine if a substitution is possible.
  const {
    missingIngredient,
    userInventory,
    cocktailName
  } = input;

  if (missingIngredient === 'Tequila' && userInventory.includes('Mezcal')) {
    return {
      hasSubstitution: true,
      substitution: 'Mezcal',
    };
  } else if (missingIngredient === 'Rum' && userInventory.includes('Vodka')) {
    return {
      hasSubstitution: true,
      substitution: 'Vodka',
    };
  } else if (missingIngredient === 'Lime' && userInventory.includes('Lemon')) {
    return {
      hasSubstitution: true,
      substitution: 'Lemon',
    };
  } else {
    return {
      hasSubstitution: false,
    };
  }
});

const prompt = ai.definePrompt({
  name: 'suggestCocktailSubstitutionsPrompt',
  input: {schema: SuggestCocktailSubstitutionsInputSchema},
  output: {schema: SuggestCocktailSubstitutionsOutputSchema},
  tools: [canSubstitute],
  prompt: `Based on the user's inventory, suggest ingredient substitutions for the cocktail, and explain the reasoning behind the substitutions.

  Cocktail Name: {{{cocktailName}}}
  User Inventory: {{#each userInventory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  If the user is missing an ingredient, use the canSubstitute tool to check for possible substitutions in the inventory.
  
  Format the output as a list of suggested substitutions and a short paragraph explaining the logic.
  `,
});

const suggestCocktailSubstitutionsFlow = ai.defineFlow(
  {
    name: 'suggestCocktailSubstitutionsFlow',
    inputSchema: SuggestCocktailSubstitutionsInputSchema,
    outputSchema: SuggestCocktailSubstitutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
