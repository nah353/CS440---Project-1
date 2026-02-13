import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p className="muted">
          {recipe.description || "No description provided for this delicious recipe."}
        </p>
        <span className="small">
          {recipe.ingredients?.length ?? 0} Ingredients
        </span>
      </div>
    </div>
  );
}