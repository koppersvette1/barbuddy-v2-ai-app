'use server';

/**
 * @fileOverview Generates a cocktail image from a text prompt.
 *
 * - generateCocktailImage - A function that generates an image.
 * - GenerateCocktailImageInput - The input type for the function.
 * - GenerateCocktailImageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCocktailImageInputSchema = z.object({
  prompt: z.string().describe('A detailed text prompt to generate an image of a cocktail.'),
});
export type GenerateCocktailImageInput = z.infer<typeof GenerateCocktailImageInputSchema>;

const GenerateCocktailImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateCocktailImageOutput = z.infer<typeof GenerateCocktailImageOutputSchema>;

export async function generateCocktailImage(input: GenerateCocktailImageInput): Promise<GenerateCocktailImageOutput> {
  return generateCocktailImageFlow(input);
}

const generateCocktailImageFlow = ai.defineFlow(
  {
    name: 'generateCocktailImageFlow',
    inputSchema: GenerateCocktailImageInputSchema,
    outputSchema: GenerateCocktailImageOutputSchema,
  },
  async input => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.prompt,
    });

    if (!media.url) {
        throw new Error("Image generation failed to return a data URI.");
    }
    
    return {
        imageDataUri: media.url,
    };
  }
);
