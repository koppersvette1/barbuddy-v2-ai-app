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
  chimneySmokerGuide: z.object({
    title: z.string().default("Using the Chimney Smoker"),
    steps: z.array(z.string()).describe('A list of step-by-step instructions on how to use the chimney smoker unit.'),
  }).describe('A guide on how to use the chimney smoker unit that sits on the glass.'),
  torchGuide: z.object({
    title: z.string().default("Handling the Torch"),
    description: z.string().describe("Tips for getting the best flame from your torch."),
    refillSteps: z.array(z.string()).describe("The 'No-Sputter' method for refilling the torch with butane."),
  }).describe('A guide on how to properly fill and use the torch for optimal performance.'),
  glasswareTips: z.array(z.object({
    glassType: z.string().describe("The type of glassware (e.g., Rocks Glass)."),
    tip: z.string().describe("A tip or consideration for using this type of glassware for smoking."),
  })).describe('Tips for different types of glassware when smoking a cocktail.'),
});

export type ExplainCocktailSmokingOutput = z.infer<typeof ExplainCocktailSmokingOutputSchema>;

export async function explainCocktailSmoking(): Promise<ExplainCocktailSmokingOutput> {
  return explainCocktailSmokingFlow();
}

const prompt = ai.definePrompt({
  name: 'explainCocktailSmokingPrompt',
  output: {schema: ExplainCocktailSmokingOutputSchema},
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect. Your goal is to help the user master their hardware.

  Explain the technique of "Smoking Cocktails" using the chimney-style smoker that sits on top of the glass. Your tone should be conversational, fun, and expert but accessible.
  
  Your explanation must include:
  1.  A clear, engaging description of what cocktail smoking is and why it's done.
  2.  A step-by-step guide on using the chimney smoker unit, including how much wood to use and how to light it.
  3.  A guide to using the torch, including the "No-Sputter" refill method (purging, filling, and waiting) and what a good flame looks like.
  4.  Practical tips for different glassware, specifically for a Rocks Glass, a Coupe/Martini glass (and the tip about smoking it upside down or in a mixing glass), and a Highball glass.
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
