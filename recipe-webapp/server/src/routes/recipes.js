import { Router } from "express";
import {
  listRecipesHandler,
  getRecipeHandler,
  createRecipeHandler
} from "../controllers/recipesController.js";

const router = Router();

router.get("/", listRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", createRecipeHandler);

export default router;
