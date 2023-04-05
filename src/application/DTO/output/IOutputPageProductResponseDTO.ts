import { Product } from '../../../domain/entities/Product';
export type IOutputPageProductResponseDTO = {
    totalPages: number,
    products: Product[]
}

/**
 * @swagger
 * components:
 *   schemas:
 *     OutputPageProductResponseDTO:
 *       type: object
 *       description: Object representing a paginated list of products
 *       properties:
 *         totalPages:
 *           type: integer
 *           description: The total number of pages for the product list
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *           description: An array of product objects for the current page
 *       example:
 *         totalPages: 10
 *         products:
 *           - id: 123e4567-e89b-12d3-a456-426655440000
 *             name: T-Shirt
 *             description: This is a black T-Shirt
 *             url_photo: http://example.com/photo.jpg
 *             categoriesId: 123e4567-e89b-12d3-a456-426655440001
 *             price: 10.99
 *             created: '2023-04-01T12:00:00Z'
 *           - id: 123e4567-e89b-12d3-a456-426655440002
 *             name: Hoodie
 *             description: This is a blue hoodie
 *             url_photo: http://example.com/hoodie.jpg
 *             categoriesId: 123e4567-e89b-12d3-a456-426655440003
 *             price: 29.99
 *             created: '2023-04-02T14:30:00Z'
 */
