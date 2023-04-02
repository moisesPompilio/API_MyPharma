import { IInputPageProductRequestDTO } from "../../application/DTO/input/IInputPageProductRequestDTO";

export class PageProductRequest {
  pageNumber: number;
  pageSize: number;
  sortDirection: "desc" | "asc";
  orderBy: "name" | "price";
  
  constructor(input?: IInputPageProductRequestDTO) {
    this.pageNumber = input?.pageNumber ?? 1;
    this.pageSize = input?.pageSize ?? 20;
    if(input?.sortDirection === "asc" || input?.sortDirection === "desc" || input?.sortDirection === undefined){
      this.sortDirection = input?.sortDirection === "asc"? "asc" : "desc";
    }else{
      throw new Error("Invalid sortDirection. Can be either 'desc' or 'asc'");
    }
    if(input?.orderBy === "name" || input?.orderBy === "price" || input?.orderBy === undefined){
      this.orderBy = input?.orderBy === "price"? "price" : "name";
    }else{
      throw new Error("Invalid orderBy. Can be either 'name' or 'price'");
    }
    
    this.validate()
  }
  
  private validate(): void {
    if (!this.pageNumber || !this.isNaturalNumber(this.pageNumber)) {
      throw new Error("pageNumber cannot be different from a natural number");
    }
    if (!this.pageSize || !this.isNaturalNumber(this.pageSize)) {
      throw new Error("pageSize cannot be different from a natural number");
    }
  }
  private isNaturalNumber(n: number): boolean {
    return typeof n === "number" && n === Math.trunc(n) && n > 0;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageProductRequest:
 *       type: object
 *       required:
 *         - pageNumber
 *         - pageSize
 *         - sortDirection
 *         - orderBy
 *       properties:
 *         pageNumber:
 *           type: integer
 *           description: Page number you want to retrieve. pageNumber needs to be a natural number (integer and greater than zero).
 *         pageSize:
 *           type: integer
 *           description: Number of items per page. pageSize needs to be a natural number (integer and greater than zero).
 *         sortDirection:
 *           type: string
 *           description: Sort direction. Can be "desc" or "asc".
 *         orderBy:
 *           type: string
 *           description: Field to order by. Can be "name" or "price"
 *       example:
 *         pageNumber: 1
 *         pageSize: 20
 *         sortDirection: desc
 *         orderBy: name
 */