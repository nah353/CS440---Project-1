import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import { fetchRecipes } from "./api/recipes.js";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(search = q) {
    setLoading(true);
    try {
      const data = await fetchRecipes(search);
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Navbar />

      <div className="searchRow">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search recipes..."
        />
        <button onClick={() => load(q)}>Search</button>
        <button onClick={() => { setQ(""); load(""); }}>Clear</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
