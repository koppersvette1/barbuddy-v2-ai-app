import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-food-pairing.ts';
import '@/ai/flows/inventory-scanning-from-image.ts';
import '@/ai/flows/suggest-wood-pairing.ts';
import '@/ai/flows/generate-recipes-from-inventory.ts';
import '@/ai/flows/suggest-cocktail-substitutions.ts';
import '@/ai/flows/explain-fat-washing.ts';
import '@/ai/flows/explain-infusion.ts';
import '@/ai/flows/explain-cocktail-smoking.ts';
import '@/ai/flows/generate-cocktail-image.ts';

    