import { apiGet, apiPost } from "./client";

export function fetchRecipes(q = "") {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return apiGet(`/recipes${qs}`);
}

export function createRecipe(payload) {
  return apiPost("/recipes", payload);
}
