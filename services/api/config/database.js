const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "ps1root",
  database: "guion_platform",
  logging: true, // Puedes poner `true` para ver los logs de la SQL en consola
});

// Probar la conexión
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

// Exportar solo el objeto sequelize
module.exports = sequelize;