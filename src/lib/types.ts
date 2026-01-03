
export type RecipeSpec = {
  ingredients: {
    item: string;
    amount: string;
  }[];
  instructions: string[];
};

export interface Recipe {
  slug: string;
  name: string;
  category: 'Spirit Forward' | 'Sours' | 'Highballs & Spritzes' | 'Tiki, Tropical & Dessert' | 'Other';
  image: string;
  imageHint?: string;
  spec: RecipeSpec;
  swap: string;
  mocktail: {
    name:string;
    spec: RecipeSpec;
  };
  kid: {
    name: string;
    spec: RecipeSpec;
  };
  custom?: boolean;
  imageDataUri?: string;
}

export type Settings = {
  showAlcohol: boolean;
  showMocktails: boolean;
  showKids: boolean;
  hasSmoker: boolean;
  inventory: string[];
  customRecipes: Recipe[];
  favoriteRecipes: string[];
  fontSize: 'small' | 'medium' | 'large';
};

export type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  setInventory: (inventory: string[]) => void;
  addCustomRecipe: (recipe: Recipe) => void;
  toggleFavorite: (slug: string) => void;
};
