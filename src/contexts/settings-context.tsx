
"use client";

import type { Recipe, Settings, SettingsContextType } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const defaultSettings: Settings = {
  showAlcohol: true,
  showMocktails: true,
  showKids: true,
  hasSmoker: true,
  inventory: [],
  customRecipes: [],
  favoriteRecipes: [],
  fontSize: 'medium',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === 'undefined') {
      return defaultSettings;
    }
    try {
      const item = window.localStorage.getItem('barbuddy-settings');
      return item ? JSON.parse(item) : defaultSettings;
    } catch (error) {
      console.error(error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('barbuddy-settings', JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }, [settings]);


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

  const toggleFavorite = (slug: string) => {
    setSettings(prev => {
      const isFavorite = prev.favoriteRecipes.includes(slug);
      if (isFavorite) {
        return { ...prev, favoriteRecipes: prev.favoriteRecipes.filter(fav => fav !== slug) };
      } else {
        return { ...prev, favoriteRecipes: [...prev.favoriteRecipes, slug] };
      }
    });
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setInventory, addCustomRecipe, toggleFavorite }}>
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
