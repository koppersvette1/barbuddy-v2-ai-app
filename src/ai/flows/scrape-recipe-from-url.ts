
'use server';

/**
 * @fileOverview Scrapes a recipe from a given URL.
 *
 * - scrapeRecipeFromUrl - A function that scrapes a recipe.
 * - ScrapeRecipeFromUrlInput - The input type for the function.
 * - ScrapeRecipeFromUrlOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

const ScrapeRecipeFromUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the recipe to scrape.'),
});
export type ScrapeRecipeFromUrlInput = z.infer<typeof ScrapeRecipeFromUrlInputSchema>;

const ScrapedIngredientSchema = z.object({
    item: z.string().describe("Ingredient name."),
    amount: z.string().describe("Amount of the ingredient."),
});

const ScrapedRecipeSchema = z.object({
    name: z.string().describe("The name of the cocktail."),
    category: z.enum(['Spirit Forward', 'Sours', 'Highballs & Spritzes', 'Tiki, Tropical & Dessert', 'Other']).describe("The category of the cocktail."),
    spec: z.object({
        ingredients: z.array(ScrapedIngredientSchema).describe("The list of ingredients."),
        instructions: z.array(z.string()).describe("The list of instructions."),
    }),
});
export type ScrapeRecipeFromUrlOutput = z.infer<typeof ScrapedRecipeSchema>;


export async function scrapeRecipeFromUrl(input: ScrapeRecipeFromUrlInput): Promise<ScrapeRecipeFromUrlOutput> {
  return scrapeRecipeFromUrlFlow(input);
}


const fetchUrlContentTool = ai.defineTool(
    {
        name: 'fetchUrlContent',
        description: 'Fetches the HTML content of a given URL.',
        inputSchema: z.object({ url: z.string().url() }),
        outputSchema: z.string(),
    },
    async ({ url }) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            // Basic HTML cleaning to remove scripts, styles, and excess whitespace
            return text
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
              .replace(/<[^>]+>/g, '\n')
              .replace(/\s+/g, ' ')
              .trim();
        } catch (error) {
            console.error('Error fetching URL content:', error);
            return "Failed to fetch content from the URL.";
        }
    }
);


const prompt = ai.definePrompt({
    name: 'scrapeRecipePrompt',
    input: { schema: z.object({ htmlContent: z.string() }) },
    output: { schema: ScrapedRecipeSchema },
    tools: [fetchUrlContentTool],
    prompt: `You are an expert recipe parsing bot. Your task is to analyze the provided HTML content from a webpage and extract the cocktail recipe details.

    Pay close attention to lists of ingredients and numbered or bulleted steps for instructions. Identify the cocktail's name and classify it into one of the provided categories.
    
    If the recipe seems to not fit any category, classify it as 'Other'.
    
    HTML Content:
    {{{htmlContent}}}
    `,
});

const scrapeRecipeFromUrlFlow = ai.defineFlow(
  {
    name: 'scrapeRecipeFromUrlFlow',
    inputSchema: ScrapeRecipeFromUrlInputSchema,
    outputSchema: ScrapedRecipeSchema,
  },
  async ({ url }) => {
    const htmlContent = await fetchUrlContentTool({ url });

    if (htmlContent.startsWith("Failed to fetch")) {
        throw new Error(htmlContent);
    }
    
    const { output } = await prompt({ htmlContent });
    return output!;
  }
);
