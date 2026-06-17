import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react'; 
import { type RecipeShort } from '../types';

interface RecipeContextType {
  recipes: RecipeShort[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeShort[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeShort[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, searchQuery, setSearchQuery }}>
      {children}
    </RecipeContext.Provider>
  );
};