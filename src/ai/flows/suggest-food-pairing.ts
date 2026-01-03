'use server';

/**
 * @fileOverview A food pairing suggestion AI agent.
 *
 * - suggestFoodPairing - A function that handles the food pairing suggestion process.
 * - SuggestFoodPairingInput - The input type for the suggestFoodPairing function.
 * - SuggestFoodPairingOutput - The return type for the suggestFoodPairing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recipes } from '@/lib/recipes';

const SuggestFoodPairingInputSchema = z.object({
  cocktailName: z.string().describe('The name of the cocktail.'),
  woodType: z.string().optional().describe('The type of wood used for smoking the cocktail, if any.'),
});
export type SuggestFoodPairingInput = z.infer<typeof SuggestFoodPairingInputSchema>;

const SuggestFoodPairingOutputSchema = z.object({
  foodPairingSuggestion: z.string().describe('A suggestion for food pairings that complement the cocktail.'),
});
export type SuggestFoodPairingOutput = z.infer<typeof SuggestFoodPairingOutputSchema>;

export async function suggestFoodPairing(input: SuggestFoodPairingInput): Promise<SuggestFoodPairingOutput> {
  return suggestFoodPairingFlow(input);
}

const getRecipeDetailsTool = ai.defineTool({
    name: 'getRecipeDetails',
    description: 'Gets the ingredients and category for a specific cocktail recipe.',
    inputSchema: z.object({ cocktailName: z.string() }),
    outputSchema: z.object({
        category: z.string(),
        ingredients: z.array(z.string()),
    }),
}, async ({ cocktailName }) => {
    const recipe = recipes.find(r => r.name.toLowerCase() === cocktailName.toLowerCase());
    if (!recipe) {
        return { category: 'Unknown', ingredients: [] };
    }
    return {
        category: recipe.category,
        ingredients: recipe.spec.ingredients.map(i => i.item),
    };
});


const prompt = ai.definePrompt({
  name: 'suggestFoodPairingPrompt',
  input: {schema: SuggestFoodPairingInputSchema},
  output: {schema: SuggestFoodPairingOutputSchema},
  tools: [getRecipeDetailsTool],
  prompt: `You are BarBuddy, an expert Gastro-Partner. Your goal is to provide excellent food pairing recommendations for a given cocktail.

  **Process:**
  1.  Use the 'getRecipeDetailsTool' to get the cocktail's category and ingredients.
  2.  Apply the "Gastro-Pairing Logic" below to determine the best food pairing.
  3.  Provide a concise and appealing suggestion in the 'foodPairingSuggestion' field. Explain the "Why" behind your pairing.

  **Gastro-Pairing Logic:**

  **1. The "BBQ Rule" (If a wood type is provided):**
  -   **Hickory/Mesquite (Savory Smoke):** Pairs with Steaks, Burgers, BBQ Ribs, Hard Cheeses (Cheddar/Gouda). *Why: The smoke mimics the char of the food.*
  -   **Oak/Pecan (Sweet Smoke):** Pairs with Roasted Chicken, Pork Chops, Caramel Desserts, Dark Chocolate. *Why: The vanilla notes in the wood complement the browning of the meat or sugar.*
  -   **Apple/Cherry (Fruit Smoke):** Pairs with Fish, Salads, Soft Cheese (Brie), Fruit Tarts. *Why: It adds a "garnish" of flavor without overpowering light food.*
  -   **RULE: Match Power with Power.** Do not pair a delicate Gin drink with a heavy Ribeye steak.

  **2. The "Cut & Complement" Logic (If no wood type is provided):**
  -   **A. The "Cut" (Acid vs. Fat):**
      -   **If the cocktail is a Sour or Fizz** (e.g., Margarita, Daiquiri, Tom Collins), recommend it for **rich, fried, or greasy food** (Tacos, Fried Chicken, Pizza).
      -   *Why: The high acid (lime/lemon) and carbonation "scrub" the palate clean.*
  -   **B. The "Complement" (Sweet vs. Heat/Salt):**
      -   **If the cocktail is Sweet/Tropical** (e.g., Mai Tai, Bee's Knees), recommend it for **spicy food** (Thai, Curry, Hot Wings).
      -   *Why: Sugar soothes the "burn" of chili heat.*
  -   **C. The "Finish" (Spirit vs. Sugar):**
      -   **If the cocktail is Spirit-Forward** (e.g., Old Fashioned, Manhattan, Espresso Martini), recommend it for **dessert**.
      -   *Why: The bitterness or burn of the spirit cuts through the sweetness of the dessert.*

  **Cocktail:** {{{cocktailName}}}
  {{#if woodType}}**Wood Smoke:** {{{woodType}}}{{/if}}
  `,
});

const suggestFoodPairingFlow = ai.defineFlow(
  {
    name: 'suggestFoodPairingFlow',
    inputSchema: SuggestFoodPairingInputSchema,
    outputSchema: SuggestFoodPairingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
