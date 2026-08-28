require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env

const app = require("./app"); // Importe l'application Express définie dans app.js

const PORT = process.env.PORT || 3000; // Prend le port du .env, sinon utilise 3000

app.listen(PORT, () => { // Démarre le serveur
    console.log(`API running on http://localhost:${PORT}`);

    if (process.env.NODE_ENV !== "production") {
        console.log(`Swagger UI: http://localhost:${PORT}/docs`);
    }
});