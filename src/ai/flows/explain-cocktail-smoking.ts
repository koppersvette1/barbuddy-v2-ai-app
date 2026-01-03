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
  preflightChecklist: z.array(z.object({
    check: z.string().describe("The item to check, e.g., 'Torch Purged'"),
    details: z.string().describe("Details about why this check is important, e.g., 'Ensure a sharp blue cone for a clean burn.'")
  })).describe("A pre-flight checklist for safety and performance before smoking."),
  chimneySmokerGuide: z.object({
    title: z.string().default("Using the Chimney Smoker"),
    steps: z.array(z.string()).describe('A list of step-by-step instructions on how to use the chimney smoker unit.'),
  }).describe('A guide on how to use the chimney smoker unit that sits on the glass.'),
  torchGuide: z.object({
    title: z.string().default("Handling the Torch"),
    description: z.string().describe("Tips for getting the best flame from your torch."),
    refillSteps: z.array(z.string()).describe("The 'No-Sputter' method for refilling the torch with butane."),
    troubleshooting: z.array(z.object({
      issue: z.string().describe("The problem, e.g., 'Yellow, Flickering Flame'."),
      solution: z.string().describe("The fix for the issue, explaining what's wrong and how to correct it."),
    })).describe("Common torch problems and how to fix them."),
  }).describe('A guide on how to properly fill, use, and troubleshoot the torch.'),
  glasswareTips: z.array(z.object({
    glassType: z.string().describe("The type of glassware (e.g., Rocks Glass)."),
    tip: z.string().describe("A tip or consideration for using this type of glassware for smoking."),
  })).describe('Tips for different types of glassware when smoking a cocktail.'),
  proTips: z.array(z.object({
      title: z.string().describe("The title of the tip, e.g., 'Flavor Advisories' or 'Gear Maintenance'."),
      points: z.array(z.string()).describe("A list of tips or best practices.")
  })).describe("A list of pro-tips and best practices for safety, maintenance, and flavor. Include a note about using the Carafe Smoke method for batching cocktails for a party.")
});

export type ExplainCocktailSmokingOutput = z.infer<typeof ExplainCocktailSmokingOutputSchema>;

export async function explainCocktailSmoking(): Promise<ExplainCocktailSmokingOutput> {
  return explainCocktailSmokingFlow();
}

const prompt = ai.definePrompt({
  name: 'explainCocktailSmokingPrompt',
  output: {schema: ExplainCocktailSmokingOutputSchema},
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect. Your goal is to help the user master their hardware safely and effectively.

  Explain the technique of "Smoking Cocktails" using the chimney-style smoker. Your tone should be conversational, fun, and expert but accessible.
  
  Your explanation must include:
  1.  A clear, engaging description of what cocktail smoking is and why it's done.
  2.  A new "Pre-Flight Checklist" section. This should be a simple list of checks to perform *before* starting:
      - Torch purged? (Ensure a sharp blue cone for a clean burn.)
      - Mesh basket clean? (Ensure proper airflow for smoke to drop.)
      - High-proof bottles moved? (Keep flammable liquids at least 1 foot away.)
  3.  A step-by-step guide on using the chimney smoker unit, including how much wood to use ("a small pinch") and how to light it.
  4.  A guide to using the torch, including the "No-Sputter" refill method (purging, filling, and waiting) and what a good flame looks like.
  5.  A "Troubleshooting" section for the torch. Explain the difference between a "sharp blue cone" (good flame) and a "yellow, flickering flame" (bad flame, needs purging). Also explain how to diagnose a clogged smoker (e.g., "if the smoke isn't dropping into the glass, the mesh is likely clogged with ash").
  6.  Practical tips for different glassware, specifically for a Rocks Glass, a Coupe/Martini glass, and a Highball glass.
  7.  A "Pro-Tips / Heads Up" section covering:
      - Flavor Advisories: Mention smoking fresh mint can taste burnt and oils/fats can leave residue.
      - Fire Best Practices: Explain handling flare-ups and keeping open bottles away.
      - Gear Maintenance: Tips on cleaning the mesh screen and wiping the chimney.
      - Party Tip: Include a point about using the "Carafe Smoke" method for batching drinks for a group to save time, mentioning that the user should swirl the liquid in the carafe for 30 seconds to integrate the smoke.
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
