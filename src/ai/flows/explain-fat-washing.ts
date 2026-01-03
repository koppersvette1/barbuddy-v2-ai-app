'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining the fat washing technique in mixology.
 *
 * - explainFatWashing - A function that returns a detailed explanation of fat washing.
 * - ExplainFatWashingOutput - The return type for the explainFatWashing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainFatWashingOutputSchema = z.object({
  techniqueName: z.string().describe('The name of the technique, which is "Fat Washing".'),
  description: z.string().describe('A detailed but approachable overview of what fat washing is, its purpose, and the flavor effects it creates.'),
  steps: z.array(z.string()).describe('A list of step-by-step instructions on how to perform a fat wash.'),
  proTips: z.array(z.string()).describe('A list of expert tips and common pitfalls to avoid.'),
});
export type ExplainFatWashingOutput = z.infer<typeof ExplainFatWashingOutputSchema>;

export async function explainFatWashing(): Promise<ExplainFatWashingOutput> {
  return explainFatWashingFlow();
}

const prompt = ai.definePrompt({
  name: 'explainFatWashingPrompt',
  output: {schema: ExplainFatWashingOutputSchema},
  prompt: `You are a master mixologist and educator, known for making complex topics easy to understand.
  
  Explain the technique of "Fat Washing" for cocktails.
  
  Your explanation should include:
  1.  A clear description of what fat washing is and why a bartender would use it.
  2.  A simple, step-by-step guide on how to do it. Use a classic example like bacon fat and bourbon.
  3.  A few "pro tips" for someone trying it for the first time, including common mistakes to avoid.

  Present the information in a clear, encouraging, and educational tone.
  `,
});

const explainFatWashingFlow = ai.defineFlow(
  {
    name: 'explainFatWashingFlow',
    outputSchema: ExplainFatWashingOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
