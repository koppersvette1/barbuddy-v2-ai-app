'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining the cocktail smoking technique.
 *
 * - explainCocktailSmoking - A function that returns a detailed explanation of cocktail smoking.
 * - ExplainCocktailSmokingOutput - The return type for the explainCocktailSmoking function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCocktailSmokingOutputSchema = z.object({
  techniqueName: z.string().describe('The name of the technique, which is "Cocktail Smoking".'),
  description: z.string().describe('A detailed but approachable overview of what cocktail smoking is, its purpose, and the flavor effects it creates.'),
  methods: z.array(z.object({
    name: z.string().describe('The name of the smoking method.'),
    description: z.string().describe('A description of the method.'),
  })).describe('A list of different methods for smoking a cocktail.'),
  proTips: z.array(z.string()).describe('A list of expert tips for successfully smoking cocktails.'),
});
export type ExplainCocktailSmokingOutput = z.infer<typeof ExplainCocktailSmokingOutputSchema>;

export async function explainCocktailSmoking(): Promise<ExplainCocktailSmokingOutput> {
  return explainCocktailSmokingFlow();
}

const prompt = ai.definePrompt({
  name: 'explainCocktailSmokingPrompt',
  output: {schema: ExplainCocktailSmokingOutputSchema},
  prompt: `You are a master mixologist and flavor scientist.
  
  Explain the technique of "Smoking Cocktails".
  
  Your explanation should include:
  1.  A clear description of what cocktail smoking is and why it's done, focusing on aroma and flavor.
  2.  A description of common methods (like using a smoking gun, or smoking the glass).
  3.  A few "pro tips" for someone trying it for the first time, including which cocktails are best suited for smoking.

  Present the information in a clear, encouraging, and educational tone.
  `,
});

const explainCocktailSmokingFlow = ai.defineFlow(
  {
    name: 'explainCocktailSmokingFlow',
    outputSchema: ExplainCocktailSmokingOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
