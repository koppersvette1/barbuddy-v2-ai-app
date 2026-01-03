'use server';

/**
 * @fileOverview A wood pairing suggestion AI agent.
 *
 * - suggestWoodPairing - A function that handles the wood pairing suggestion process.
 * - SuggestWoodPairingInput - The input type for the suggestWoodPairing function.
 * - SuggestWoodPairingOutput - The return type for the suggestWoodPairing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWoodPairingInputSchema = z.object({
  cocktailName: z.string().describe('The name of the cocktail.'),
  cocktailIngredients: z
    .string()
    .describe('The ingredients of the cocktail.'),
  spiritType: z.string().describe('The type of spirit in the cocktail.'),
});

export type SuggestWoodPairingInput = z.infer<typeof SuggestWoodPairingInputSchema>;

const SuggestWoodPairingOutputSchema = z.object({
  woodSuggestion: z
    .string()
    .describe(
      'A suggestion for the best wood pairing to enhance the cocktail flavor, considering the spirit type and ingredients.'
    ),
  rationale: z
    .string()
    .describe(
      'The rationale behind the wood pairing suggestion, explaining how it complements the cocktail ingredients and enhances the overall flavor profile.'
    ),
});

export type SuggestWoodPairingOutput = z.infer<typeof SuggestWoodPairingOutputSchema>;

export async function suggestWoodPairing(
  input: SuggestWoodPairingInput
): Promise<SuggestWoodPairingOutput> {
  return suggestWoodPairingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWoodPairingPrompt',
  input: {schema: SuggestWoodPairingInputSchema},
  output: {schema: SuggestWoodPairingOutputSchema},
  prompt: `You are an expert mixologist specializing in wood chip pairings for smoked cocktails. Given the cocktail name, ingredients, and spirit type, suggest the best wood pairing to enhance the cocktail flavor and provide a rationale for your suggestion.

Cocktail Name: {{{cocktailName}}}
Cocktail Ingredients: {{{cocktailIngredients}}}
Spirit Type: {{{spiritType}}}

Consider the flavor profiles of different woods and how they complement the cocktail ingredients. Explain how the suggested wood pairing enhances the overall flavor profile of the cocktail.

Format your response as follows:

Wood Suggestion: [Name of wood]
Rationale: [Explanation of why this wood is a good pairing]`,
});

const suggestWoodPairingFlow = ai.defineFlow(
  {
    name: 'suggestWoodPairingFlow',
    inputSchema: SuggestWoodPairingInputSchema,
    outputSchema: SuggestWoodPairingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
