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
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect specializing in wood chip pairings for smoked cocktails. Your goal is to provide expert, accessible advice.

Given the cocktail name, ingredients, and spirit type, suggest the best wood pairing to enhance the cocktail flavor and provide a rationale for your suggestion.

Cocktail Name: {{{cocktailName}}}
Cocktail Ingredients: {{{cocktailIngredients}}}
Spirit Type: {{{spiritType}}}

Use your knowledge of spirit and wood profiles to make an intelligent recommendation.
- Bourbon (sweet, vanilla, caramel) pairs best with Cherry (enhances sweetness) or Oak (mimics barrel-aging).
- Rye (spicy, dry) pairs well with Hickory to add savory depth.
- Tequila/Mezcal pair well with Mesquite to connect with saline/citrus notes.
- Gin's botanical notes are delicate; Apple wood can soften it without overpowering it.
- Use Oak as a "Fixer" to add barrel-aged notes to cocktails that are using a clear spirit as a substitute for a dark one.
- Use Hickory to add a savory, bacon-like quality that can cut through sweetness.
- Use Apple wood to act as a "Softener" for less expensive or harsh spirits to smooth out the "burn."

Explain your choice based on complementing or contrasting flavors to create a balanced experience.

Format your response as follows:

Wood Suggestion: [Name of wood]
Rationale: [Explanation of why this wood is a good pairing, referencing specific flavor interactions.]`,
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
