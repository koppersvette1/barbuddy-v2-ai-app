'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining the spirit infusion technique in mixology.
 *
 * - explainInfusion - A function that returns a detailed explanation of infusions.
 * - ExplainInfusionOutput - The return type for the explainInfusion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainInfusionOutputSchema = z.object({
  techniqueName: z.string().describe('The name of the technique, which is "Spirit Infusion".'),
  description: z.string().describe('A detailed but approachable overview of what spirit infusion is, its purpose, and how it transforms flavors.'),
  steps: z.array(z.string()).describe('A list of step-by-step instructions on how to create an infusion.'),
  proTips: z.array(z.string()).describe('A list of expert tips for successful infusions, including example recipes and synergy with smoke.'),
});
export type ExplainInfusionOutput = z.infer<typeof ExplainInfusionOutputSchema>;

export async function explainInfusion(): Promise<ExplainInfusionOutput> {
  return explainInfusionFlow();
}

const prompt = ai.definePrompt({
  name: 'explainInfusionPrompt',
  output: {schema: ExplainInfusionOutputSchema},
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect.
  
  Explain the technique of "Spirit Infusion" for cocktails. Your tone should be conversational, fun, and expert but accessible.
  
  Your explanation must include:
  1.  Concept: A clear description of what an infusion is. It's about adding deep flavor over days, not quick aroma like smoking.
  2.  Basic Technique: Provide a simple, step-by-step guide for using an infusion vessel (jar with a mesh filter).
  3.  "Make Your Own" Logic / Pro-Tips: Include a section with creative examples:
      - DIY Gin: Vodka + Juniper Berries + Citrus Peel (24 hours).
      - Spiced Rum: White Rum + Vanilla Bean + Cinnamon Stick + Orange Peel (48 hours).
      - Quick Oak Aging: White Whiskey + Charred Oak Chips (1 week).
  4.  Synergy with Smoking: Explain how to layer flavors. Infuse the spirit first to create the "Base Flavor," then smoke the final cocktail to add a "Top Note." Use the example of a Jalapeño-infused Vodka Mule that is then smoked with Mesquite.
  `,
});

const explainInfusionFlow = ai.defineFlow(
  {
    name: 'explainInfusionFlow',
    outputSchema: ExplainInfusionOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
