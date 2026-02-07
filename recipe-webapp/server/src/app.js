import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js";
import recipesRouter from "./routes/recipes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
  })
);

app.use("/api/health", healthRouter);
app.use("/api/recipes", recipesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
