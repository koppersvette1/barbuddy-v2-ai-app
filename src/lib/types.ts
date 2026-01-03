export interface Recipe {
  slug: string;
  name: string;
  category: 'Spirit Forward' | 'Sours' | 'Highballs & Spritzes' | 'Tiki, Tropical & Dessert';
  image: string;
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
}

export type Settings = {
  showAlcohol: boolean;
  showMocktails: boolean;
  showKids: boolean;
  hasSmoker: boolean;
  showBeta: boolean;
  inventory: string[];
  fontSize: 'small' | 'medium' | 'large';
};

export type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  setInventory: (inventory: string[]) => void;
};
