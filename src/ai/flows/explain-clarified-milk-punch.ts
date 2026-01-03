'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining the clarified milk punch technique.
 *
 * - explainClarifiedMilkPunch - A function that returns a detailed explanation of milk punch.
 * - ExplainClarifiedMilkPunchOutput - The return type for the explainClarifiedMilkPunch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainClarifiedMilkPunchOutputSchema = z.object({
  techniqueName: z.string().describe('The name of the technique, which is "Clarified Milk Punch".'),
  description: z.string().describe('A detailed but approachable overview of what clarified milk punch is, its purpose, and the effects it creates.'),
  steps: z.array(z.string()).describe('A list of step-by-step instructions on how to perform clarification.'),
  proTips: z.array(z.string()).describe('A list of expert tips, including why it works and how it interacts with smoke.'),
});
export type ExplainClarifiedMilkPunchOutput = z.infer<typeof ExplainClarifiedMilkPunchOutputSchema>;

export async function explainClarifiedMilkPunch(): Promise<ExplainClarifiedMilkPunchOutput> {
  return explainClarifiedMilkPunchFlow();
}

const prompt = ai.definePrompt({
  name: 'explainClarifiedMilkPunchPrompt',
  output: {schema: ExplainClarifiedMilkPunchOutputSchema},
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect.

  Explain the technique of "Clarified Milk Punch". Your tone should be conversational, fun, and expert but accessible.
  
  Your explanation must include:
  1.  Concept: Explain what it is. You are curdling a cocktail with milk and acid, then straining out the solids to create a crystal-clear, silky-smooth, and shelf-stable drink.
  2.  The Science ("The Why"): Explain that milk proteins (casein) bind to tannins and polyphenols (the harsh stuff in spirits and teas). Filtering out the curds physically removes this harshness, resulting in a rounded, smooth mouthfeel.
  3.  Basic Technique: Provide a simple, step-by-step guide.
  4.  Pro-Tips / Synergy with Smoke: Explain that because the liquid is so clean and stripped of harsh edges, smoke can be very powerful. Recommend using Light Woods like Apple or Pear to avoid overpowering it.
  `,
});

const explainClarifiedMilkPunchFlow = ai.defineFlow(
  {
    name: 'explainClarifiedMilkPunchFlow',
    outputSchema: ExplainClarifiedMilkPunchOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
