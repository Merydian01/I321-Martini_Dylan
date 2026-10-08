const Pizza = require('../entities/Pizza');

const INGREDIENT_SERVICE_URL = process.env.INGREDIENT_SERVICE_URL || 'http://localhost:3001';

async function fetchIngredient(id) {
    let response;

    try {
        response = await fetch(`${INGREDIENT_SERVICE_URL}/api/v1/ingredients/${id}`);
    } catch (err) {
        const error = new Error('Ingredient service unavailable');
        error.status = 502;
        throw error;
    }

    if (response.status === 404) return null;

    if (!response.ok) {
        const error = new Error(`Ingredient service returned ${response.status}`);
        error.status = 502;
        throw error;
    }

    return response.json();
}

const PizzaService = {
    async getAll() {
        return Pizza.findAll();
    },

    async getById(id) {
        const pizza = await Pizza.findById(id);
        if (!pizza) return null;

        const compositions = await Pizza.findCompositions(id);
        const ingredients = await Promise.all(
            compositions.map(async ({ ingredient_id }) => {
                const ingredient = await fetchIngredient(ingredient_id);
                return ingredient || { id: ingredient_id, unavailable: true };
            })
        );

        return { ...pizza, ingredients };
    },

    async create(data) {
        const existingPizza = await Pizza.findByName(data.name);
        if (existingPizza) {
            const error = new Error('Pizza name already exists');
            error.status = 409;
            throw error;
        }

        for (const ingredientId of data.ingredients) {
            const ingredient = await fetchIngredient(ingredientId);
            if (!ingredient) {
                const error = new Error(`Ingredient ${ingredientId} does not exist`);
                error.status = 400;
                throw error;
            }
        }

        const pizza = await Pizza.create(data);

        for (const ingredientId of data.ingredients) {
            await Pizza.addComposition(pizza.id, ingredientId);
        }

        return this.getById(pizza.id);
    },

    async update(id, data) {
        const existing = await Pizza.findById(id);
        if (!existing) return null;

        if (data.name && data.name !== existing.name) {
            const sameName = await Pizza.findByName(data.name);
            if (sameName && sameName.id !== id) {
                const error = new Error('Pizza name already exists');
                error.status = 409;
                throw error;
            }
        }

        if (Array.isArray(data.ingredients)) {
            for (const ingredientId of data.ingredients) {
                const ingredient = await fetchIngredient(ingredientId);
                if (!ingredient) {
                    const error = new Error(`Ingredient ${ingredientId} does not exist`);
                    error.status = 400;
                    throw error;
                }
            }
        }

        await Pizza.update(id, data);

        if (Array.isArray(data.ingredients)) {
            await Pizza.deleteCompositions(id);
            for (const ingredientId of data.ingredients) {
                await Pizza.addComposition(id, ingredientId);
            }
        }

        return this.getById(id);
    },

    async delete(id) {
        const existing = await Pizza.findById(id);
        if (!existing) return 0;

        await Pizza.deleteCompositions(id);
        return Pizza.delete(id);
    }
};

module.exports = PizzaService;
