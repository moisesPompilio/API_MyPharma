import { Request, Response } from 'express';

import { GetPageProductUsecase } from '../../../application/usecases/ProductUseCase/GetPageProductUsecase';
import { covertQueryInInputPageProductDTO } from '../../../application/util/covertQueryInInputPageProductDTO';

export class GetPageProductController {
    constructor(private readonly getPageProductUsecase: GetPageProductUsecase) {}
  
    async invoke(req: Request, res: Response): Promise<Response> {
      try {
        const categoryId = typeof req.query.categoryId === "string" ? req.query.categoryId : undefined;
        const searchByName = typeof req.query.searchByName === "string" ? req.query.searchByName : undefined;
        const inputCategoryDTO = covertQueryInInputPageProductDTO(req.query)
  
        const categories = await this.getPageProductUsecase.handle(inputCategoryDTO, categoryId, searchByName);
  
        return res.status(200).send(categories);
      } catch (error) {
        return res.status(500).json({
          message: error.message || "Unexpected error",
        });
      }
    }
  }