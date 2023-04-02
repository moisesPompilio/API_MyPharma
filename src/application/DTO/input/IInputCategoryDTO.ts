export type IInputCategoryDTO = {
    name: string;
    description: string;    
    url_photo: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     IInputCategoryDTO:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - url_photo
 *       properties:
 *         name:
 *           type: string
 *           description: The category name
 *         description:
 *           type: string
 *           description: The category description
 *         url_photo:
 *           type: string
 *           description: The category url_photo
 *       example:
 *         name: T-Shirt
 *         description: where will you find the best t-shirts
 *         url_photo: http://tiny.cc/bdw5vz
 */