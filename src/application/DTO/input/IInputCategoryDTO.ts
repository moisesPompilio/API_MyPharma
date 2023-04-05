export type IInputCategoryDTO = {
    name: string;  
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
 *         url_photo:
 *           type: string
 *           description: The category url_photo
 *       example:
 *         name: T-Shirt
 *         url_photo: http://tiny.cc/bdw5vz
 */