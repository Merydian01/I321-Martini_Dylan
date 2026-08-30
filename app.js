const express = require("express"); // Importe Express
const productRoutes = require("./routes/products")
const app = express();

// Permet de lire les données JSON envoyées à l'API
app.use(express.json());
app.use("/api/products", productRoutes)

// Route principale
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

module.exports = app;


// ==================================================
// Éléments prévus pour la suite du projet
// ==================================================

// Logs des requêtes
// const morgan = require("morgan");
// app.use(morgan("dev"));

// Base de données
// const initDatabase = require("./config/db");
// const db = initDatabase();

// app.use((req, res, next) => {
//     req.db = db;
//     next();
// });

// Routes utilisateurs séparées
// const userRoutes = require("./routes/users");
// app.use("/api/users", userRoutes);

// Gestion des erreurs
// const errorHandler = require("./middleware/errorHandler");
// app.use(errorHandler);