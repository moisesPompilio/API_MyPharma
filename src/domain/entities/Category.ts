import { IsString, IsOptional, IsNotEmpty, IsDateString, validateOrReject } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Category {
    @IsString()
    id: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    url_photo: string;

    constructor(props: Omit<Category, "id">, id?: string) {
        Object.assign(this, props);
        if (!id) {
          this.id = uuidv4();
        } else {
          this.id = id;
        }
        validateOrReject(this).catch(errors => {return new Error(errors.map((error: any) => Object.values(error.constraints)).join(', '))});
      }
  }


  /**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - url_photo
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The category id
 *         name:
 *           type: string
 *           description: The category name
 *         url_photo:
 *           type: string
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426655440001
 *         name: T-Shirt
 *         url_photo: http://tiny.cc/bdw5vz
 */