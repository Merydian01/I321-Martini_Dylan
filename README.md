# I321 - Foodtruck microservices

Le projet est séparé en deux nœuds indépendants :

- `ms-pizzas` : API pizzas, port 3000, base `pizzas.sqlite`.
- `ms-ingredients` : API ingrédients, port 3001, base `ingredients.sqlite`.

La table `product_compositions` appartient au microservice pizzas et conserve les associations `pizza_id` / `ingredient_id`. L'existence d'un ingrédient est contrôlée via HTTP auprès du microservice ingrédients.

## Lancer le projet

Terminal 1 :
```bash
cd ms-ingredients
npm install
npm run dev
```

Terminal 2 :
```bash
cd ms-pizzas
npm install
npm run dev
```

## Test rapide

- `GET http://localhost:3001/api/v1/ingredients`
- `GET http://localhost:3000/api/v1/pizzas`
- `GET http://localhost:3000/api/v1/pizzas/4` retourne la pizza et récupère ses ingrédients via le microservice ingrédients.

Exemple de création :
```json
{
  "name": "Pizza microservice test",
  "description": "Test",
  "imageUrl": "test.jpg",
  "price": 12.5,
  "ingredients": [1, 2]
}
```
