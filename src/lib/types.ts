
export interface Recipe {
  slug: string;
  name: string;
  category: 'Spirit Forward' | 'Sours' | 'Highballs & Spritzes' | 'Tiki, Tropical & Dessert';
  image: string;
  imageHint?: string;
  spec: {
    ingredients: {
      item: string;
      amount: string;
    }[];
    instructions: string[];
  };
  swap: string;
  mocktail: {
    name:string;
    recipe: string;
  };
  kid: {
    name: string;
    recipe: string;
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
