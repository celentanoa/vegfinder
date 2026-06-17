import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { type RecipeDetailType } from '../types';
import { getRecipeById } from '../services/api';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Nuovo stato per l'errore di rete o server
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.error("Errore nel recupero dei dettagli:", err);
        setError("Impossibile connettersi al server per recuperare i dettagli della ricetta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p className="message">Caricamento dettagli...</p>;
  
  // Se c'è un errore di rete/server, mostra questo prima del controllo sulla ricetta vuota
  if (error) return (
    <div className="recipe-detail">
      <button onClick={() => navigate(-1)} className="btn-back">← Torna indietro</button>
      <p className="error-message" style={{ color: 'red', marginTop: '20px' }}>{error}</p>
    </div>
  );

  // Se la chiamata è andata a buon fine (nessun errore) ma l'API ha restituito null
  if (!recipe) return (
    <div className="recipe-detail">
      <button onClick={() => navigate(-1)} className="btn-back">← Torna indietro</button>
      <p className="message">La ricetta richiesta non esiste o non è stata trovata.</p>
    </div>
  );

  const sanitizedInstructions = recipe.instructions ? DOMPurify.sanitize(recipe.instructions) : '';

  return (
    <div className="recipe-detail">
      <button onClick={() => navigate(-1)} className="btn-back">← Torna indietro</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="detail-img"/>
      
      <div className="recipe-info">
        <p><strong>Tempo di preparazione:</strong> {recipe.readyInMinutes} minuti</p>
        <p><strong>Porzioni:</strong> {recipe.servings}</p>
      </div>

      <h2>Ingredienti</h2>
      <ul className="ingredients-list">
        {recipe.extendedIngredients.map((ing, index) => (
          <li key={`${ing.id}-${index}`}>{ing.original}</li>
        ))}
      </ul>

      <h2>Istruzioni</h2>
      {recipe.instructions ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedInstructions }} className="instructions" />
      ) : (
        <p>Istruzioni non disponibili per questa ricetta.</p>
      )}
    </div>
  );
};

export default RecipeDetail;