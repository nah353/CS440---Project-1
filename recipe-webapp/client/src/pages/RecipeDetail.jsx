import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the specific recipe from your list
  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) return <div className="container">Recipe not found!</div>;

  return (
    <div className="container detail-view">
      <button className="upload-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="scanner-hero" style={{marginTop: '20px', textAlign: 'left'}}>
        <span className="tag" style={{background: 'var(--nau-gold)', color: 'white'}}>NAU Recipe Lab</span>
        <h1 style={{fontSize: '3rem'}}>{recipe.title}</h1>
        <p>{recipe.desc}</p>
      </div>

      <div className="card" style={{padding: '40px', background: 'white', borderRadius: '24px'}}>
        <h2 style={{color: 'var(--nau-blue)', borderBottom: '2px solid var(--bg-soft)', paddingBottom: '10px'}}>
          Ingredients
        </h2>
        <ul style={{lineHeight: '2', fontSize: '1.1rem'}}>
          {recipe.ingredientsList?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || <li>No ingredients listed.</li>}
        </ul>
      </div>
    </div>
  );
}