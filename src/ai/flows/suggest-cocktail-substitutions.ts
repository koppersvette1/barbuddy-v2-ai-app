'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting cocktail ingredient substitutions based on user inventory.
 *
 * - suggestCocktailSubstitutions - A function that takes a cocktail name and user inventory, and returns suggested substitutions.
 * - SuggestCocktailSubstitutionsInput - The input type for the suggestCocktailSubstitutions function.
 * - SuggestCocktailSubstitutionsOutput - The return type for the suggestCocktailSubstitutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recipes } from '@/lib/recipes';

const SuggestCocktailSubstitutionsInputSchema = z.object({
  cocktailName: z.string().describe('The name of the cocktail to make.'),
  userInventory: z.array(z.string()).describe('The list of ingredients in the user\'s inventory.'),
});
export type SuggestCocktailSubstitutionsInput = z.infer<typeof SuggestCocktailSubstitutionsInputSchema>;

const SubstitutionSchema = z.object({
  missingIngredient: z.string().describe("The original ingredient that is missing."),
  suggestedIngredient: z.string().describe("The ingredient from the user's inventory that can be used as a substitute."),
  reasoning: z.string().describe("A clear, concise explanation of why this substitution works, based on flavor science and pairing logic. Explain what flavor changes to expect."),
});

const SuggestCocktailSubstitutionsOutputSchema = z.object({
  substitutions: z.array(SubstitutionSchema).describe('A list of suggested ingredient substitutions with explanations.'),
  notes: z.string().optional().describe("General notes or a summary of the substitutions, like an overall flavor profile change."),
});
export type SuggestCocktailSubstitutionsOutput = z.infer<typeof SuggestCocktailSubstitutionsOutputSchema>;

export async function suggestCocktailSubstitutions(input: SuggestCocktailSubstitutionsInput): Promise<SuggestCocktailSubstitutionsOutput> {
  return suggestCocktailSubstitutionsFlow(input);
}

const getRecipeIngredientsTool = ai.defineTool({
  name: 'getRecipeIngredients',
  description: 'Gets the list of required ingredients for a specific cocktail recipe.',
  inputSchema: z.object({
    cocktailName: z.string().describe("The name of the cocktail to look up."),
  }),
  outputSchema: z.array(z.string()).describe("A list of the cocktail's ingredients."),
}, async ({ cocktailName }) => {
  const recipe = recipes.find(r => r.name.toLowerCase() === cocktailName.toLowerCase());
  return recipe ? recipe.spec.ingredients.map(i => i.item) : [];
});


const prompt = ai.definePrompt({
  name: 'suggestCocktailSubstitutionsPrompt',
  input: {schema: SuggestCocktailSubstitutionsInputSchema},
  output: {schema: SuggestCocktailSubstitutionsOutputSchema},
  tools: [getRecipeIngredientsTool],
  prompt: `You are BarBuddy, a creative Mixology Partner and Flavor Architect. Your mission is to help the user make amazing cocktails with what they have.

You will be given a cocktail name and the user's current inventory.
1. First, use the 'getRecipeIngredientsTool' to find the required ingredients for the specified cocktail.
2. Compare the required ingredients to the user's inventory. Identify what's missing.
3. For each missing ingredient, use your "Flex-Bar" logic and "Custom Substitution Algorithm" to find the best possible replacement from the user's inventory.

**Your Substitution Logic:**
- **Similar Items First:** Look for direct, common substitutions (e.g., Bourbon for Rye, Lemon for Lime).
- **Flavor Profile Shift:** If a direct sub isn't available, suggest a creative twist based on flavor profiles (e.g., no Tequila for a Margarita? Suggest a Gin-based Gimlet if they have Gin).
- **The "Fixer" Algorithm:**
  - **Dark to Clear Spirit (e.g., Whiskey -> Vodka):** The drink will lack body and oak. State this, and suggest adding Oak or Pecan smoke to add back the missing barrel notes.
  - **Clear to Dark Spirit (e.g., Gin -> Bourbon):** The drink will be sweeter. State this, and suggest reducing the sugar or using Cherry Wood to complement the sweetness.
  - **To a Savory Spirit (e.g., Tequila -> Mezcal):** The drink will get smoky. State this, and suggest using Mesquite smoke to enhance it.

**Output Format:**
- For each substitution, provide the missing ingredient, the suggested replacement, and a concise "reasoning" that explains *why* it works and what flavor changes to expect.
- If no substitutions are possible or needed, return an empty 'substitutions' array.
- Your tone should be fun, can-do, and encouraging.

**User's Inventory:**
{{#each userInventory}}
- {{{this}}}
{{/each}}
`,
});

const suggestCocktailSubstitutionsFlow = ai.defineFlow(
  {
    name: 'suggestCocktailSubstitutionsFlow',
    inputSchema: SuggestCocktailSubstitutionsInputSchema,
    outputSchema: SuggestCocktailSubstitutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { substitutions: [] };
    }
    return output;
  }
);
