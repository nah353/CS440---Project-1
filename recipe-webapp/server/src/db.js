let recipes = [
  {
    id: 1,
    title: "Example Pancakes",
    description: "Fluffy starter recipe",
    ingredients: ["Flour", "Eggs", "Milk"],
    instructions: "Mix, cook, eat."
  }
];

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
  const newRecipe = { id: nextId, ...data };
  recipes.push(newRecipe);
  return newRecipe;
}
