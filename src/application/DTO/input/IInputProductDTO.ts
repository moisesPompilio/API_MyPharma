export type IInputProductDTO = {
    name: string;
    description?: string;
    url_photo: string;
    categoriesId: string;
    price: number
    created?: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     IInputProductDTO:
 *       type: object
 *       required:
 *         - name
 *         - url_photo
 *         - categoriesId
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         url_photo:
 *           type: string
 *           description: The URL of the product photo
 *         categoriesId:
 *           type: string
 *           format: uuid
 *           description: The ID of the product's category
 *         price:
 *           type: number
 *           description: The price of the product
 *         created:
 *           type: string
 *           format: date-time
 *           description: The date and time the product was created
 *       example:
 *         name: T-Shirt
 *         description: Comfortable and stylish T-Shirt
 *         url_photo: https://example.com/t-shirt.jpg
 *         categoriesId: 123e4567-e89b-12d3-a456-426655440001
 *         price: 29.99
 *         created: 2023-04-02T12:34:56Z
 */
