export interface RecipeShort {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface Ingredient {
  id: number;
  original: string;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeDetailType {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: Ingredient[];
  instructions: string | null;
  summary: string;
}