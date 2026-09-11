# I321-Martini_Dylan

## Routes de l'API

| Fonctionnalité | Méthode | Route | Code succès |
|---|---|---|---|
| Lister les pizzas | GET | `/api/products` | 200 |
| Afficher une pizza | GET | `/api/products/:id` | 200 |
| Ajouter une pizza | POST | `/api/products` | 201 |
| Modifier une pizza | PUT | `/api/products/:id` | 200 |
| Supprimer une pizza | DELETE | `/api/products/:id` | 204 |

Exemple du body :

```json
{
  "title": "Diavola",
  "image": null,
  "ingredients": ["Tomato", "Mozzarella", "Salami"],
  "price": 12.5
}