import {Router} from 'express';

import { createCategoryController, deleteByCategoryController, getAllCategoryController, updateByIdCategoryController } from '../controllers/CategoryController/index';

export const routesCategory = Router();

/**
 * @swagger
 * tags:
 * name: API MyPharma test
 * description: MyPharma technical test api
 */



/**
 * @swagger
 * /category:
 *   post:
 *     summary: Created category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IInputCategoryDTO'
 *     responses:
 *       201:
 *         description: The category was created successfully
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found category
 */
routesCategory.post("/", (request, response) => {
    return createCategoryController.invoke(request, response);
})


/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: The Category was successfully deleted
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found category
 */

routesCategory.delete("/:id", (request, response) => {
    return deleteByCategoryController.invoke(request, response);
})


/**
 * @swagger
 * /category:
 *   get:
 *     summary: List all category
 *     tags: [Category]
 *     responses:
 *       500:
 *         description:  Some server error
 *       200:
 *         description: Action completed successfully returns an array of category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
routesCategory.get("/", (request, response) => {
    return getAllCategoryController.invoke(request, response);
})


/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
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
 *             $ref: '#/components/schemas/IInputCategoryDTO'
 *     responses:
 *       204:
 *         description: The category has been updated successfully
 *       500:
 *         description: Some server error
 *       404:
 *         description: Not found category
 */
routesCategory.put("/:id", (request, response) => {
    return updateByIdCategoryController.invoke(request, response);
})