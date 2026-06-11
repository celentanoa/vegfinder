import React, { useContext, useState } from 'react';
import axios from 'axios';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { type RecipeShort } from '../types';

const API_KEY = '40b4dca3850e412eb6be0b193609685b';

const Home: React.FC = () => {
  const context = useContext(RecipeContext);
  
  // Controllo di sicurezza richiesto da TypeScript per i Context opzionali
  if (!context) {
    throw new Error("Home deve essere usato all'interno di un RecipeProvider");
  }

  const { recipes, setRecipes, searchQuery, setSearchQuery } = context;
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      // Definiamo il tipo di risposta atteso da Axios
      const response = await axios.get<{ results: RecipeShort[] }>(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: API_KEY,
            diet: 'vegetarian',
            query: searchQuery,
            number: 12
          }
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Errore nel caricamento delle ricette:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h1>Cerca Ricette Vegetariane</h1>
      <form onSubmit={searchRecipes} className="search-form">
        <input 
          type="text" 
          placeholder="Es: pasta, tomato, soup..." 
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>

      {loading && <p className="message">Caricamento in corso...</p>}

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;