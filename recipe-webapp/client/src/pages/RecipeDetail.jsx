import React, { useMemo, useState } from "react";

const DEV_OVERRIDE_USER = "xfilly";

function canManageRecipe(user, recipe) {
  const username = String(user?.username || "").toLowerCase();
  const createdBy = String(recipe?.createdBy || "").toLowerCase();
  return username === DEV_OVERRIDE_USER || username === createdBy;
}

export default function RecipeDetail({ recipe, onBack, onEdit, onDelete, currentUser, onRequireAuth }) {
  if (!recipe) return <div className="container">Recipe not found!</div>;

  const isOwner = canManageRecipe(currentUser, recipe);
  const [unitSystem, setUnitSystem] = useState("original");

  const convertedIngredients = useMemo(() => {
    return convertUnitsList(recipe.ingredients || [], unitSystem);
  }, [recipe.ingredients, unitSystem]);

  const convertedInstructions = useMemo(() => {
    return convertUnitsText(recipe.instructions || "", unitSystem);
  }, [recipe.instructions, unitSystem]);

  const unitButtonLabel = unitSystem === "imperial" ? "Convert to Metric" : "Convert to Imperial";
  const hasIngredients = convertedIngredients.length > 0;

  return (
    <div className="container detail-view">
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button className="upload-btn" onClick={onBack}>← Back</button>
        {isOwner ? (
          <>
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
          </>
        ) : (
          <button
            className="upload-btn"
            onClick={onRequireAuth}
            style={{ background: 'var(--nau-blue)', flex: 1 }}
          >
            {currentUser ? "Only creator can edit" : "Login to manage your recipes"}
          </button>
        )}
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
        <p className="small" style={{ marginTop: '0', color: 'var(--text-secondary)' }}>
          Created by: {recipe.createdBy || "Unknown"}
        </p>
        <p>{recipe.description || "A delicious recipe to enjoy!"}</p>
      </div>

      <div className="card" style={{padding: '40px', borderRadius: '24px', marginBottom: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h2 style={{color: 'var(--nau-blue)', borderBottom: '2px solid var(--nau-gold)', paddingBottom: '10px'}}>
            Ingredients
          </h2>
          <button
            type="button"
            className="upload-btn"
            onClick={() => setUnitSystem((prev) => (prev === "imperial" ? "metric" : "imperial"))}
            style={{ marginBottom: 0, padding: '8px 16px' }}
          >
            {unitButtonLabel}
          </button>
        </div>
        <ul style={{lineHeight: '2', fontSize: '1.1rem'}}>
          {hasIngredients ? (
            convertedIngredients.map((item, index) => (
              <li key={index}>
                <span style={{color: 'var(--nau-gold)', marginRight: '8px'}}>-</span>
                {item}
              </li>
            ))
          ) : (
            <li>No ingredients listed.</li>
          )}
        </ul>
      </div>

      <div className="card" style={{padding: '40px', borderRadius: '24px'}}>
        <h2 style={{color: 'var(--nau-blue)', borderBottom: '2px solid var(--nau-gold)', paddingBottom: '10px'}}>
          Instructions
        </h2>
        <div style={{lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap'}}>
          {convertedInstructions || "No instructions provided."}
        </div>
      </div>
    </div>
  );
}

const QUANTITY_PATTERN = "(\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:\\.\\d+)?)";

const METRIC_TO_IMPERIAL = [
  { unitRegex: "l|liter(?:s)?", factor: 1.05669, unitLabel: "qt" },
  { unitRegex: "ml|milliliter(?:s)?", factor: 0.033814, unitLabel: "fl oz" },
  { unitRegex: "kg|kilogram(?:s)?", factor: 2.20462, unitLabel: "lb" },
  { unitRegex: "g|gram(?:s)?", factor: 0.035274, unitLabel: "oz" },
  { unitRegex: "cm|centimeter(?:s)?", factor: 0.393701, unitLabel: "in" }
];

const IMPERIAL_TO_METRIC = [
  { unitRegex: "fl\\.?\\s*oz\\.?|fluid\\s+ounce(?:s)?", factor: 29.5735, unitLabel: "ml" },
  { unitRegex: "tbsp|tablespoon(?:s)?", factor: 14.7868, unitLabel: "ml" },
  { unitRegex: "tsp|teaspoon(?:s)?", factor: 4.92892, unitLabel: "ml" },
  { unitRegex: "cup(?:s)?", factor: 236.588, unitLabel: "ml" },
  { unitRegex: "pt|pint(?:s)?", factor: 473.176, unitLabel: "ml" },
  { unitRegex: "qt|quart(?:s)?", factor: 946.353, unitLabel: "ml" },
  { unitRegex: "gal|gallon(?:s)?", factor: 3.78541, unitLabel: "l" },
  { unitRegex: "lb|lbs|pound(?:s)?", factor: 0.453592, unitLabel: "kg" },
  { unitRegex: "oz|ounce(?:s)?", factor: 28.3495, unitLabel: "g" },
  { unitRegex: "in|inch(?:es)?", factor: 2.54, unitLabel: "cm" }
];

function convertUnitsList(items, targetSystem) {
  return items.map((item) => convertUnitsText(item, targetSystem));
}

function convertUnitsText(text, targetSystem) {
  if (!text || targetSystem === "original") return text;

  let result = convertTemperatures(text, targetSystem);
  const conversions = targetSystem === "imperial" ? METRIC_TO_IMPERIAL : IMPERIAL_TO_METRIC;

  conversions.forEach((conversion) => {
    const regex = new RegExp(`\\b${QUANTITY_PATTERN}\\s*(${conversion.unitRegex})\\b`, "gi");
    result = result.replace(regex, (match, quantity) => {
      const numeric = parseQuantity(quantity);
      if (Number.isNaN(numeric)) return match;
      const converted = numeric * conversion.factor;
      return `${formatQuantity(converted)} ${conversion.unitLabel}`;
    });
  });

  return result;
}

function parseQuantity(raw) {
  const value = String(raw).trim();
  if (value.includes(" ")) {
    const [whole, fraction] = value.split(/\s+/);
    return parseFloat(whole) + parseFraction(fraction);
  }
  if (value.includes("/")) {
    return parseFraction(value);
  }
  return parseFloat(value);
}

function parseFraction(raw) {
  const [numerator, denominator] = raw.split("/").map(Number);
  if (!denominator) return NaN;
  return numerator / denominator;
}

function formatQuantity(value) {
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1");
}

function convertTemperatures(text, targetSystem) {
  if (targetSystem === "imperial") {
    return text.replace(/(\d+(?:\.\d+)?)\s*°\s*C\b/gi, (_, value) => {
      const fahrenheit = (parseFloat(value) * 9) / 5 + 32;
      return `${formatQuantity(fahrenheit)} °F`;
    });
  }

  return text.replace(/(\d+(?:\.\d+)?)\s*°\s*F\b/gi, (_, value) => {
    const celsius = ((parseFloat(value) - 32) * 5) / 9;
    return `${formatQuantity(celsius)} °C`;
  });
}