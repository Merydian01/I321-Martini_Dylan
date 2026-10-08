// controllers/pizzaController.js
const { validationResult } = require('express-validator');
const PizzaService = require('../services/pizzaService');

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, imageUrl, price, ingredients } = req.body;
        const created = await PizzaService.create({ name, description, imageUrl, price, ingredients });
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const pizzas = await PizzaService.getAll();
        return res.status(200).json(pizzas);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const pizza = await PizzaService.getById(Number(req.params.id));
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });

        return res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = Number(req.params.id);
        const { name, description, imageUrl, price, ingredients } = req.body;
        const updated = await PizzaService.update(id, { name, description, imageUrl, price, ingredients });

        if (!updated) return res.status(404).json({ error: 'Pizza not found' });
        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const deleted = await PizzaService.delete(Number(req.params.id));
        if (deleted === 0) return res.status(404).json({ error: 'Pizza not found' });

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
