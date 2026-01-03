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
  proTips: z.array(z.string()).describe('A list of expert tips for successful infusions.'),
});
export type ExplainInfusionOutput = z.infer<typeof ExplainInfusionOutputSchema>;

export async function explainInfusion(): Promise<ExplainInfusionOutput> {
  return explainInfusionFlow();
}

const prompt = ai.definePrompt({
  name: 'explainInfusionPrompt',
  output: {schema: ExplainInfusionOutputSchema},
  prompt: `You are a master mixologist and educator, known for making complex topics easy to understand.
  
  Explain the technique of "Spirit Infusion" for cocktails.
  
  Your explanation should include:
  1.  A clear description of what an infusion is and why it's a fundamental skill in creative mixology.
  2.  A simple, step-by-step guide on how to do it. Use a classic example like cucumber and gin or chili peppers and tequila.
  3.  A few "pro tips" for someone trying it for the first time, including advice on infusion times and choosing ingredients.

  Present the information in a clear, encouraging, and educational tone.
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
