import React from 'react';
import { Link } from 'react-router-dom';
import { type RecipeShort } from '../types';


interface RecipeCardProps {
  recipe: RecipeShort;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <Link to={`/recipe/${recipe.id}`} className="btn">Vedi Ricetta</Link>
      </div>
    </div>
  );
};

export default RecipeCard;