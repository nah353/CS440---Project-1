import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RECIPES_FILE = path.join(__dirname, "..", "recipes.json");

// Load recipes from file or initialize with default
function loadRecipes() {
  try {
    if (fs.existsSync(RECIPES_FILE)) {
      const data = fs.readFileSync(RECIPES_FILE, "utf-8");
      const parsed = JSON.parse(data);
      console.log(`✅ Loaded ${parsed.length} recipes from file`);
      return parsed;
    }
  } catch (error) {
    console.error("Error reading recipes file:", error.message);
  }
  
  // Default recipe if file doesn't exist
  return [
    {
      id: 1,
      title: "Example Pancakes",
      description: "Fluffy starter recipe",
      ingredients: ["Flour", "Eggs", "Milk"],
      instructions: "Mix, cook, eat.",
      image: null
    }
  ];
}

// Save recipes to file
function saveRecipes(recipes) {
  try {
    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2), "utf-8");
    console.log(`✅ Saved ${recipes.length} recipes to file`);
  } catch (error) {
    console.error("Error saving recipes file:", error.message);
  }
}

let recipes = loadRecipes();

export function listRecipes({ q }) {
  if (!q) return recipes;
  const query = q.toLowerCase();
  return recipes.filter((r) => r.title.toLowerCase().includes(query));
}

export function getRecipeById(id) {
  return recipes.find((r) => r.id === id) || null;
}

export function createRecipe(data) {
  const nextId = recipes.length ? Math.max(...recipes.map((r) => r.id)) + 1 : 1;
  const newRecipe = { 
    id: nextId, 
    title: data.title,
    description: data.description || "",
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    instructions: data.instructions || "",
    image: data.image || null
  };
  recipes.push(newRecipe);
  saveRecipes(recipes);
  console.log(`✅ Recipe created: ${newRecipe.title} (ID: ${newRecipe.id})`);
  return newRecipe;
}

export function updateRecipe(id, data) {
  const recipe = getRecipeById(id);
  if (!recipe) return null;
  
  Object.assign(recipe, data);
  saveRecipes(recipes);
  return recipe;
}

export function deleteRecipe(id) {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return false;
  
  recipes.splice(index, 1);
  saveRecipes(recipes);
  return true;
}
