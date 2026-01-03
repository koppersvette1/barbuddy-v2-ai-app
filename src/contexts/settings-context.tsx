
"use client";

import type { Recipe, Settings, SettingsContextType } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const defaultSettings: Settings = {
  showAlcohol: true,
  showMocktails: true,
  showKids: true,
  hasSmoker: true,
  inventory: [],
  customRecipes: [],
  fontSize: 'medium',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const setInventory = (inventory: string[]) => {
    setSettings(prev => ({ ...prev, inventory }));
  };
  
  const addCustomRecipe = (recipe: Recipe) => {
    setSettings(prev => ({
      ...prev,
      customRecipes: [...prev.customRecipes, recipe]
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setInventory, addCustomRecipe }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
