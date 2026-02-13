import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the API key from your server's .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeMedia(fileBuffer, mimeType) {
  // Use the Flash model for fast multimodal analysis
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Identify the food in this ${mimeType.startsWith("video") ? "video" : "image"}. 
  Provide a detailed recipe including:
  1. Title
  2. Brief description
  3. Ingredients list.
  Return the data strictly as JSON.`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType
      },
    },
  ]);

  const response = await result.response;
  return JSON.parse(response.text());
}