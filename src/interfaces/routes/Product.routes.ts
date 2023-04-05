import { Router } from 'express';
import { createProductController, deleteByIdProductController, getPageProductController, updateByIdProductController } from '../controllers/ProductController/index';


export const routesProduct = Router();

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Created product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IInputProductDTO'
 *     responses:
 *       201:
 *         description: The Product was created successfully
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found Product
 */
routesProduct.post("/", (request, response) => {
    return createProductController.invoke(request, response);
})


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: The Product was successfully deleted
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found Product
 */

routesProduct.delete("/:id", (request, response) => {
    return deleteByIdProductController.invoke(request, response);
})


/**
 * @swagger
 * /product:
 *   get:
 *     summary: list the products in the way you want, but if you don't inform it will bring 20 items in alphabetical order
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number you want to retrieve. pageNumber needs to be a natural number (integer and greater than zero).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page. pageSize needs to be a natural number (integer and greater than zero).
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The sort direction for the returned items Can be "desc" or "asc".
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [name, price]
 *         description: Field to order by. Can be "name" or "price"
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: get the products from that category informed
 *       - in: query
 *         name: searchByName
 *         schema:
 *           type: string
 *         description: get the products from that searchByName informed
 *     responses:
 *       500:
 *         description: Some server error
 *       200:
 *         description: Action completed successfully returns an array of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OutputPageProductResponseDTO'
 */

routesProduct.get("/", (request, response) => {
    return getPageProductController.invoke(request, response);
})


/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IInputProductDTO'
 *     responses:
 *       204:
 *         description: The Product has been updated successfully
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found Product
 */
routesProduct.put("/:id", (request, response) => {
    return updateByIdProductController.invoke(request, response);
})