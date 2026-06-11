import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type RecipeDetailType } from '../types';

const API_KEY = '40b4dca3850e412eb6be0b193609685b';

const RecipeDetail: React.FC = () => {
  // useParams in TS restituisce un oggetto con valori potenzialmente undefined
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get<RecipeDetailType>(
          `https://api.spoonacular.com/recipes/${id}/information`,
          { params: { apiKey: API_KEY } }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Errore nel recupero dei dettagli:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p className="message">Caricamento dettagli...</p>;
  if (!recipe) return <p className="message">Ricetta non trovata.</p>;

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
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2>Istruzioni</h2>
      {recipe.instructions ? (
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="instructions" />
      ) : (
        <p>Istruzioni non disponibili per questa ricetta.</p>
      )}
    </div>
  );
};

export default RecipeDetail;