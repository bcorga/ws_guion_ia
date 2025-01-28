require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const OpenAI = require("openai");

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Cargar la clave desde el .env
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡El backend está funcionando!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const imageRoutes = require("./routes/images");
app.use("/api/images", imageRoutes);

const sequelize = require("./config/database");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
    await sequelize.sync(); // Sincroniza modelos con la base de datos
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
});