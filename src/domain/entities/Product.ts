import { IsString, IsOptional, IsNotEmpty, IsDateString, validateOrReject } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Product {
      
    @IsString()
    id: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
    @IsNotEmpty()
    @IsString()
    url_photo: string;
  
    @IsNotEmpty()
    @IsString()
    categoriesId: string;

    price: number
  
    @IsDateString()
    created?: Date;

      constructor(props: Omit<Product, "id">, id?: string) {
        Object.assign(this, props);
        if (!id) {
          this.id = uuidv4();
        } else {
          this.id = id;
        }
        validateOrReject(this).catch(errors => {return new Error(errors.map((error: any) => Object.values(error.constraints)).join(', '))});
        if(this.created === undefined || this.created === null){
          this.created = new Date();
        }
        if(this.price <= 0){
          throw new Error("Price must be greater than 0")
        }
      }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - url_photo
 *         - categoriesId
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the product
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
 *           description: The identifier of the product category
 *         price:
 *           type: number
 *           minimum: 0.01
 *           description: The price of the product
 *         created:
 *           type: string
 *           format: date-time
 *           description: The date and time the product was created
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426655440000
 *         name: T-Shirt
 *         description: This is a black T-Shirt
 *         url_photo: http://example.com/photo.jpg
 *         categoriesId: 123e4567-e89b-12d3-a456-426655440001
 *         price: 10.99
 *         created: '2023-04-01T12:00:00Z'
 */
