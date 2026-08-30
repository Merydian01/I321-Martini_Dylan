const express = require("express");
const router = express.Router();
const pizzas = [
    {
        id: 1,
        title: "Margherita",
        image: null,
        ingredients: [
            "Tomato",
            "Mozzarella",
            "Basil"
        ],
        price: 8.5
    }
];

// -- ROUTES -- //

// GET -> Affiche toutes les pizzas.
router.get("/", (req, res) => {
    res.json(pizzas);
});


//GET -> Affiche une pizza
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    // Va chercher l'id de la pizza dans le tableau pizzas
    const pizza = pizzas.find(pizza => pizza.id === id);

    if(!pizza) {
        // Erreur en cas de pizza non-existante
        return res.status(404).json({
            error: "Pizza pas trouvée"

        });
    }
    res.status(200).json(pizza);
});


// POST ->  Ajouter une pizza
router.post("/", (req, res) => {
    // Récupère les informations de la pizza envoyées par le client
    const { title, image, ingredients, price} = req.body

    const newPizza ={
    id: pizzas.length + 1,
    title: title,
    image: image,
    ingredients: ingredients,
    price: price
  };
  pizzas.push(newPizza)

  res.status(201).json(newPizza);
});


// PUT -> Modifier une pizza
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    // Récupère les informations de la pizza envoyées par le client
    const { title, image, ingredients, price} = req.body

    // Cherche la position de la pizza dans le tableau
    const pizza = pizzas.find(pizza => pizza.id === id);

    if(!pizza) {
        // Erreur en cas de pizza non-existante
        return res.status(404).json({
            error: "Pizza pas trouvée"

        });
    }
    pizza.title = title;
    pizza.image = image;
    pizza.ingredients = ingredients;
    pizza.price = price;

    res.status(200).json(pizza);

});


// DELETE ->  Supprimer une pizza
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    // Cherche la position de la pizza dans le tableau
    const pizzaIndex = pizzas.findIndex(pizza => pizza.id === id);

    // Si findIndex retourne -1, aucune pizza avec cet id n'existe
    if (pizzaIndex === -1) {
        return res.status(404).json({
            error : "Pizza introuvable"
        });
    }

    // Supprime 1 élément du tableau à partir de la position trouvée
    pizzas.splice(pizzaIndex, 1)

    res.status(204).send();

});
module.exports = router;