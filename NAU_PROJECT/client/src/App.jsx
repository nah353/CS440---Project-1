import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Add Link, Routes, Route
import RecipeDetail from "./pages/RecipeDetail";
import "./styles/app.css";

export default function App() {
  const [recipes] = useState([
    { 
      id: 1, 
      title: "Grand Canyon Omelette", 
      desc: "A hearty breakfast for explorers.", 
      ingredientsList: ["3 Large Eggs", "Cheddar Cheese", "Bell Peppers", "Onions", "Ham"] 
    },
    { 
      id: 2, 
      title: "Ponderosa Pine Pesto", 
      desc: "Fresh basil and toasted pine nuts.", 
      ingredientsList: ["2 cups Basil", "1/2 cup Pine Nuts", "Garlic", "Olive Oil", "Parmesan"] 
    },
  ]);

  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={
        <div className="container">
          <nav className="nav">
            <div className="brand">NAU Recipe Lab</div>
          </nav>

          <section className="scanner-hero">
            <h1>Transform Photos into Recipes</h1>
            <label className="upload-btn">
              Select Photo or Video
              <input type="file" hidden accept="image/*,video/*" />
            </label>
          </section>

          <div className="grid">
            {recipes.map(recipe => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="recipe-card">
                  <div className="card-info">
                    <span className="tag">Click to View Ingredients</span>
                    <h3>{recipe.title}</h3>
                    <p style={{color: '#64748b'}}>{recipe.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      } />

      {/* Detail Route */}
      <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
    </Routes>
  );
}