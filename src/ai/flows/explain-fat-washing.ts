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
  proTips: z.array(z.string()).describe('A list of expert tips and common pitfalls to avoid, including best pairings and why it works with smoke.'),
});
export type ExplainFatWashingOutput = z.infer<typeof ExplainFatWashingOutputSchema>;

export async function explainFatWashing(): Promise<ExplainFatWashingOutput> {
  return explainFatWashingFlow();
}

const prompt = ai.definePrompt({
  name: 'explainFatWashingPrompt',
  output: {schema: ExplainFatWashingOutputSchema},
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect.

  Explain the technique of "Fat Washing" for cocktails. Your tone should be conversational, fun, and expert but accessible.
  
  Your explanation must include:
  1.  Concept: A clear description of what fat washing is and why a bartender would use it. Explain that it adds flavor and a silky texture without the grease.
  2.  The Science: Explain *why* it works. Fat is soluble in alcohol. By freezing the mixture, we solidify and remove the lipids (grease), but the flavor molecules that bonded with the ethanol remain.
  3.  Basic Technique: Provide a simple, step-by-step guide. Use bacon fat and bourbon as the primary example (approx 1oz fat per 750ml bottle).
  4.  Pro-Tips / Best Pairings: Include a "pro tips" section covering:
      - How fat washing's savory mouthfeel pairs incredibly well with smoke.
      - Specific pairings: Bacon Fat Bourbon with Hickory Smoke, Brown Butter Rum with Pecan Smoke, and Coconut Oil Campari for a tropical twist.
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
