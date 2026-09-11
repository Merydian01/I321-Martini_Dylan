// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/pizzas:
 *   get:
 *     summary: Retrieve all pizzas
 *     tags:
 *       - Pizzas
 *     responses:
 *       200:
 *         description: List of pizzas
 *
 *   post:
 *     summary: Create a pizza
 *     tags:
 *       - Pizzas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/margherita.jpg
 *               price:
 *                 type: number
 *                 example: 15.50
 *     responses:
 *       201:
 *         description: Pizza created
 *       400:
 *         description: Invalid data
 *
 * /api/v1/pizzas/{id}:
 *   get:
 *     summary: Retrieve a pizza by id
 *     tags:
 *       - Pizzas
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
 *
 *   put:
 *     summary: Update a pizza
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/margherita.jpg
 *               price:
 *                 type: number
 *                 example: 15.50
 *     responses:
 *       200:
 *         description: Pizza updated
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Pizza not found
 *
 *   delete:
 *     summary: Delete a pizza
 *     tags:
 *       - Pizzas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pizza deleted
 *       404:
 *         description: Pizza not found
 */

const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('description').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', pizzaController.findAll);
router.post('/', createAndUpdateValidations, pizzaController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaController.findOne);
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], pizzaController.update);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaController.delete);

module.exports = router;