import React from "react";

export default function RecipeDetail({ recipe, onBack, onEdit, onDelete }) {
  if (!recipe) return <div className="container">Recipe not found!</div>;

  return (
    <div className="container detail-view">
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button className="upload-btn" onClick={onBack}>← Back</button>
        <button 
          className="upload-btn"
          onClick={() => onEdit(recipe)}
          style={{ background: 'var(--nau-blue)', flex: 1 }}
        >
          Edit Recipe
        </button>
        <button 
          className="upload-btn"
          onClick={() => {
            if (confirm("Are you sure you want to delete this recipe?")) {
              onDelete(recipe.id);
            }
          }}
          style={{ background: '#ff6b6b' }}
        >
          Delete
        </button>
      </div>
      
      {recipe.image && (
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '24px',
          border: '2px solid var(--nau-blue)',
          boxShadow: 'var(--shadow-dark)'
        }}>
          <img 
            src={recipe.image} 
            alt={recipe.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      <div className="scanner-hero" style={{marginTop: recipe.image ? '0' : '20px', textAlign: 'left'}}>
        <span className="tag" style={{background: 'var(--nau-gold)', color: 'var(--bg-dark)'}}>NAU Recipe Lab</span>
        <h1 style={{fontSize: '3rem'}}>{recipe.title}</h1>
        <p>{recipe.description || "A delicious recipe to enjoy!"}</p>
      </div>

      <div className="card" style={{padding: '40px', borderRadius: '24px', marginBottom: '20px'}}>
        <h2 style={{color: 'var(--nau-blue)', borderBottom: '2px solid var(--nau-gold)', paddingBottom: '10px'}}>
          Ingredients
        </h2>
        <ul style={{lineHeight: '2', fontSize: '1.1rem'}}>
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>
              <span style={{color: 'var(--nau-gold)', marginRight: '8px'}}>-</span>
              {item}
            </li>
          )) || <li>No ingredients listed.</li>}
        </ul>
      </div>

      <div className="card" style={{padding: '40px', borderRadius: '24px'}}>
        <h2 style={{color: 'var(--nau-blue)', borderBottom: '2px solid var(--nau-gold)', paddingBottom: '10px'}}>
          Instructions
        </h2>
        <div style={{lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap'}}>
          {recipe.instructions || "No instructions provided."}
        </div>
      </div>
    </div>
  );
}