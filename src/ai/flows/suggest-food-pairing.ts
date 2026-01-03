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
  notes: z.string().optional().describe("Additional dynamic adjustments or warnings, such as avoiding certain woods with spicy foods."),
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
  prompt: `You are BarBuddy, an expert Gastro-Partner. Your goal is to provide creative and excellent food pairing recommendations for a given cocktail, not just a fixed list. Your reasoning should be expert but accessible.

  **Process:**
  1.  Use the 'getRecipeDetailsTool' to get the cocktail's category and ingredients.
  2.  Apply the "Gastro-Pairing Logic" below to determine the best food pairing.
  3.  Provide a concise and appealing suggestion in the 'foodPairingSuggestion' field. Explain the "Why" behind your pairing. The food items listed are EXAMPLES; use the underlying principle to suggest other suitable dishes.
  4.  Provide dynamic pairing adjustments in the 'notes' field, such as advising against strong woods with spicy food.
  5.  If relevant, use "Bridge Theory" to explain the pairing (e.g., how a specific flavor note in the drink connects to a flavor in the food).

  **Gastro-Pairing Logic:**

  **1. The "BBQ Rule" (If a wood type is provided):**
  -   **Principle for Hickory/Mesquite (Savory Smoke):** The savory, BBQ-like smoke mimics the char of grilled or roasted foods.
      -   Examples: Steaks, burgers, BBQ ribs, hard cheeses (Cheddar/Gouda), brisket, grilled sausages.
  -   **Principle for Oak/Pecan (Sweet Smoke):** The vanilla notes in the wood complement flavors from roasting or caramelization. Use the "Sweet Bridge" theory to connect the vanilla/caramel notes in the wood/spirit to desserts. For example: "The Oak smoke in this Old Fashioned acts as a Sweet Bridge, connecting the bitter notes of your dark chocolate to the vanilla in the Bourbon."
      -   Examples: Roasted chicken, pork chops, caramel desserts, dark chocolate, grilled salmon, cornbread.
  -   **Principle for Apple/Cherry (Fruit Smoke):** The light, sweet smoke acts as a gentle garnish for more delicate foods.
      -   Examples: Fish (especially white fish), salads with fruit, soft cheeses (Brie/Camembert), fruit tarts, scallops.
  -   **RULE: Match Power with Power.** Do not pair a delicate Gin drink with a heavy Ribeye steak.

  **2. The "Cut & Complement" Logic (If no wood type is provided):**
  -   **A. The "Cut" (Acid vs. Fat):**
      -   **If the cocktail is a Sour or Fizz** (e.g., Margarita, Daiquiri), recommend it for **rich, fried, or greasy food.**
      -   *Why:* The high acid (lime/lemon) and carbonation "scrub" the palate clean.
      -   Examples: Tacos, fried chicken, pizza, calamari, rich pasta dishes.
  -   **B. The "Complement" (Sweet vs. Heat/Salt):**
      -   **If the cocktail is Sweet/Tropical** (e.g., Mai Tai, Bee's Knees), recommend it for **spicy food.**
      -   *Why:* Sugar soothes the "burn" of chili heat. Avoid strong woods like Hickory here as they can compete with the spices.
      -   Examples: Thai green curry, spicy noodles, hot wings, jerk chicken.
  -   **C. The "Finish" (Spirit vs. Sugar):**
      -   **If the cocktail is Spirit-Forward** (e.g., Old Fashioned, Manhattan), recommend it for **dessert.**
      -   *Why:* The bitterness or burn of the spirit cuts through the sweetness of the dessert.
      -   Examples: Chocolate cake, cheesecake, tiramisu, crème brûlée.

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
    if (!output) {
      return { foodPairingSuggestion: 'Could not determine a pairing at this time.' };
    }
    return output;
  }
);
