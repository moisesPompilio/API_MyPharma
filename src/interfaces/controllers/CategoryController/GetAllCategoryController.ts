import { Request, Response } from 'express';

import { GetAllCategoryUsecase } from '../../../application/usecases/CategoryUseCase/GetAllCategoryUsecase';

export class GetAllCategoryController{
    constructor(private readonly getAllCategoryUsecase: GetAllCategoryUsecase){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const categories = await this.getAllCategoryUsecase.handle()
            return res.status(200).send(categories)
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}