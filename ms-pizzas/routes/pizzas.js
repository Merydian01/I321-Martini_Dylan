// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

/**
 * @openapi
 * /api/v1/pizzas:
 *   get:
 *     tags: [Pizzas]
 *     summary: Retrieve all pizzas
 *     responses:
 *       200:
 *         description: List of pizzas
 *   post:
 *     tags: [Pizzas]
 *     summary: Create a pizza and its composition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, ingredients]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Pizza created
 *       400:
 *         description: Invalid data or ingredient
 *       409:
 *         description: Pizza name already exists
 *
 * /api/v1/pizzas/{id}:
 *   get:
 *     tags: [Pizzas]
 *     summary: Retrieve a pizza with its ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza found
 *       404:
 *         description: Pizza not found
 */

const createValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString(),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredients').isArray({ min: 1 }).withMessage('ingredients must contain at least one id'),
    body('ingredients.*').isInt({ min: 1 }).withMessage('ingredient ids must be positive integers').toInt()
];

const updateValidations = [
    body('name').optional().isString().notEmpty(),
    body('description').optional().isString(),
    body('imageUrl').optional().isString(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    body('ingredients').optional().isArray({ min: 1 }).withMessage('ingredients must contain at least one id'),
    body('ingredients.*').optional().isInt({ min: 1 }).withMessage('ingredient ids must be positive integers').toInt()
];

router.get('/', pizzaController.findAll);
router.post('/', createValidations, pizzaController.create);
router.get('/:id', [param('id').isInt({ min: 1 }).withMessage('id must be an integer')], pizzaController.findOne);
router.put('/:id', [param('id').isInt({ min: 1 }).withMessage('id must be an integer'), ...updateValidations], pizzaController.update);
router.delete('/:id', [param('id').isInt({ min: 1 }).withMessage('id must be an integer')], pizzaController.delete);

module.exports = router;
