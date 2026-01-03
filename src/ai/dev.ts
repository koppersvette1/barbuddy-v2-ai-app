import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-food-pairing.ts';
import '@/ai/flows/inventory-scanning-from-image.ts';
import '@/ai/flows/suggest-wood-pairing.ts';
import '@/ai/flows/generate-recipes-from-inventory.ts';
import '@/ai/flows/suggest-cocktail-substitutions.ts';