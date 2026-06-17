import axios from 'axios';
import { type RecipeShort, type RecipeDetailType } from '../types';

const BASE_URL = 'https://api.spoonacular.com/recipes';

// Istanza base di Axios
const apiInstance = axios.create({
  baseURL: BASE_URL,
});

// Intercettore di richiesta per iniettare dinamicamente la chiave dal file .env
apiInstance.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

  if (!apiKey) {
    console.error("ATTENZIONE: La variabile VITE_SPOONACULAR_KEY non è definita nel file .env!");
  }

  config.params = {
    ...config.params,
    apiKey: apiKey,
  };

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Cerca ricette vegetariane in base alla query dell'utente
 */
export const searchRecipes = async (query: string, number = 12): Promise<RecipeShort[]> => {
  const response = await apiInstance.get<{ results: RecipeShort[] }>('/complexSearch', {
    params: {
      diet: 'vegetarian',
      query: query,
      number: number,
    },
  });
  return response.data.results;
};

/**
 * Recupera i dettagli informativi di una singola ricetta tramite ID
 */
export const getRecipeById = async (id: string): Promise<RecipeDetailType> => {
  const response = await apiInstance.get<RecipeDetailType>(`/${id}/information`);
  return response.data;
};