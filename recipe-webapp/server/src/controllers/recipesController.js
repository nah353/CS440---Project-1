import { listRecipes, getRecipeById, createRecipe } from "../db.js";

export function listRecipesHandler(req, res) {
  const q = req.query.q || "";
  res.json(listRecipes({ q }));
}

export function getRecipeHandler(req, res) {
  const id = Number(req.params.id);
  const recipe = getRecipeById(id);
  if (!recipe) return res.status(404).json({ error: "Recipe not found" });
  res.json(recipe);
}

export function createRecipeHandler(req, res) {
  const { title, description, ingredients, instructions } = req.body;

  if (!title || !instructions) {
    return res.status(400).json({ error: "title and instructions are required" });
  }

  const newRecipe = createRecipe({
    title,
    description: description || "",
    ingredients: Array.isArray(ingredients) ? ingredients : [],
    instructions
  });

  res.status(201).json(newRecipe);
}
