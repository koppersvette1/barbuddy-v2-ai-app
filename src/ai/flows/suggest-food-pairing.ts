'use server';

/**
 * @fileOverview A food pairing suggestion AI agent.
 *
 * - suggestFoodPairing - A function that handles the food pairing suggestion process.
 * - SuggestFoodPairingInput - The input type for the suggestFoodPairing function.
 * - SuggestFoodPairingOutput - The return type for the suggestFoodPairing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFoodPairingInputSchema = z.object({
  cocktailName: z.string().describe('The name of the cocktail.'),
  woodType: z.string().optional().describe('The type of wood used for smoking the cocktail, if any.'),
});
export type SuggestFoodPairingInput = z.infer<typeof SuggestFoodPairingInputSchema>;

const SuggestFoodPairingOutputSchema = z.object({
  foodPairingSuggestion: z.string().describe('A suggestion for food pairings that complement the cocktail.'),
});
export type SuggestFoodPairingOutput = z.infer<typeof SuggestFoodPairingOutputSchema>;

export async function suggestFoodPairing(input: SuggestFoodPairingInput): Promise<SuggestFoodPairingOutput> {
  return suggestFoodPairingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFoodPairingPrompt',
  input: {schema: SuggestFoodPairingInputSchema},
  output: {schema: SuggestFoodPairingOutputSchema},
  prompt: `You are an expert culinary assistant specializing in cocktail and food pairings. Given the name of a cocktail, and optionally a type of wood used for smoking the cocktail, suggest food pairings that would complement the drink.

Cocktail Name: {{{cocktailName}}}
Wood Type (if any): {{{woodType}}}

Consider the flavor profiles of the cocktail and wood, and suggest food items that would either complement or cut through those flavors for a balanced culinary experience.
`,
});

const suggestFoodPairingFlow = ai.defineFlow(
  {
    name: 'suggestFoodPairingFlow',
    inputSchema: SuggestFoodPairingInputSchema,
    outputSchema: SuggestFoodPairingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
