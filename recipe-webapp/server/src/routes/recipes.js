import { Router } from "express";
import {
  listRecipesHandler,
  getRecipeHandler,
  createRecipeHandler,
  updateRecipeHandler,
  deleteRecipeHandler
} from "../controllers/recipesController.js";

const router = Router();

router.get("/", listRecipesHandler);
router.post("/", createRecipeHandler);
router.get("/:id", getRecipeHandler);
router.put("/:id", updateRecipeHandler);
router.delete("/:id", deleteRecipeHandler);

export default router;
