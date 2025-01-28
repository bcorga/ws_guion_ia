const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

// Configura el cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint para generar imágenes con DALL·E
router.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "El prompt es obligatorio." });
    }

    // Llamada a la API de OpenAI (DALL·E)
    const response = await openai.images.generate({
      model: "dall-e-2", // O puedes usar dall-e-2 si no tienes acceso a DALL·E 3
      prompt: prompt,
      n: 1,
      size: "1024x1024", // Opciones: 256x256, 512x512, 1024x1024
    });

    // Obtener la URL de la imagen generada
    const imageUrl = response.data[0].url;
    return res.json({ imageUrl });
  } catch (error) {
    console.error("Error generando la imagen:", error);
    res.status(500).json({ error: "Error al generar la imagen." });
  }
});

module.exports = router;