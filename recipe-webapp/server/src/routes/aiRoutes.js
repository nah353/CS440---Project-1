import express from "express";
import multer from "multer";
import { analyzeMedia } from "../services/geminiService.js";

const router = express.Router();
const upload = multer(); // For handling file uploads in memory

router.post("/analyze", upload.single("media"), async (req, res) => {
  try {
    const recipeData = await analyzeMedia(req.file.buffer, req.file.mimetype);
    res.json(recipeData);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to analyze media" });
  }
});

export default router;