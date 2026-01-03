'use server';

/**
 * @fileOverview Scans an image of a liquor cabinet to identify ingredients.
 *
 * - inventoryScanningFromImage - A function that handles the inventory scanning process from an image.
 * - InventoryScanningFromImageInput - The input type for the inventoryScanningFromImage function.
 * - InventoryScanningFromImageOutput - The return type for the inventoryScanningFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryScanningFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a liquor cabinet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type InventoryScanningFromImageInput = z.infer<
  typeof InventoryScanningFromImageInputSchema
>;

const InventoryScanningFromImageOutputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients identified in the liquor cabinet.'),
});
export type InventoryScanningFromImageOutput = z.infer<
  typeof InventoryScanningFromImageOutputSchema
>;

export async function inventoryScanningFromImage(
  input: InventoryScanningFromImageInput
): Promise<InventoryScanningFromImageOutput> {
  return inventoryScanningFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryScanningFromImagePrompt',
  input: {schema: InventoryScanningFromImageInputSchema},
  output: {schema: InventoryScanningFromImageOutputSchema},
  prompt: `You are a world-class bartender with expertise in identifying liquor and ingredients from images.
  Analyze the provided image of a liquor cabinet and identify all the visible ingredients.
  Return a list of these ingredients. Be as specific as possible, including brands if visible.
  If you are unsure about an ingredient, do not include it in the list.
  Make sure to only return the ingredients in the requested JSON format. 

  Image: {{media url=photoDataUri}}`,
});

const inventoryScanningFromImageFlow = ai.defineFlow(
  {
    name: 'inventoryScanningFromImageFlow',
    inputSchema: InventoryScanningFromImageInputSchema,
    outputSchema: InventoryScanningFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
