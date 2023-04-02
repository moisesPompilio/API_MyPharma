import { Request, Response } from 'express';

import { GetPageProductUsecase } from '../../../application/usecases/ProductUseCase/GetPageProductUsecase';
import { CovertQueryInInputPageProductDTO } from '../../../application/util/CovertQueryInInputPageProductDTO';

export class GetPageProductController {
    constructor(private readonly getPageProductUsecase: GetPageProductUsecase) {}
  
    async invoke(req: Request, res: Response): Promise<Response> {
      try {
        const categoryId = typeof req.query.categoryId === "string" ? req.query.categoryId : undefined;
        const inputCategoryDTO = CovertQueryInInputPageProductDTO(req.query)
  
        const categories = await this.getPageProductUsecase.handle(inputCategoryDTO, categoryId);
  
        return res.status(200).send(categories);
      } catch (error) {
        return res.status(500).json({
          message: error.message || "Unexpected error",
        });
      }
    }
  }