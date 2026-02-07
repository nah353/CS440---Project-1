import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <h3>{recipe.title}</h3>
      <p className="muted">{recipe.description}</p>
      <p className="small">
        Ingredients: {recipe.ingredients?.length ?? 0}
      </p>
    </div>
  );
}
