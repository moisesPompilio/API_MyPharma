export type IInputPageProductRequestDTO = {
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: string;
    orderBy?: string;
  }

/**
 * @swagger
 * components:
 *   schemas:
 *     IInputPageProductRequestDTO:
 *       type: object
 *       properties:
 *         pageNumber:
 *           type: number
 *           description: The page number that you want. pageNumber needs to be a natural number (integer and greater than zero).
 *         pageSize:
 *           type: number
 *           description: The number of items per page. pageSize needs to be a natural number (integer and greater than zero).
 *         sortDirection:
 *           type: string
 *           description: The direction of the sorting. Can be either 'desc' or 'asc'.
 *         orderBy:
 *           type: string
 *           description: The field to order by. Can be either 'name' or 'price'.
 *       example:
 *         pageNumber: 1
 *         pageSize: 20
 *         sortDirection: desc
 *         orderBy: name
 */
