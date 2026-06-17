import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/api';

const Home: React.FC = () => {
  const context = useContext(RecipeContext);
  
  if (!context) {
    throw new Error("Home deve essere usato all'interno di un RecipeProvider");
  }

  const { recipes, setRecipes, searchQuery, setSearchQuery } = context;
  const [loading, setLoading] = useState<boolean>(false);
 
  // Nuovo stato per gestire l'errore visibile all'utente
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError(null); // Resetta l'errore a ogni nuova ricerca

    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
      
      if (results.length === 0) {
        setError("Nessuna ricetta vegetariana trovata per questa ricerca.");
      }
    } catch (err) {
      console.error("Errore nel caricamento delle ricette:", err);
      // Messaggio chiaro per l'utente
      setError("Si è verificato un errore durante il recupero delle ricette. Controlla la connessione o riprova più tardi.");
      setRecipes([]); // Svuota la griglia in caso di errore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h1>Cerca Ricette Vegetariane</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Es: pasta, tomato, soup..." 
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>

      {loading && <p className="message">Caricamento in corso...</p>}
      
      {/* Mostra il messaggio di errore se presente */}
      {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>{error}</p>}

      <div className="recipes-grid">
        {!loading && recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;