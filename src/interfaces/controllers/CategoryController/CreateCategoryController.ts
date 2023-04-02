import { Request, Response } from 'express';

import { CreateCategoryUsecase } from '../../../application/usecases/CategoryUseCase/CreateCategoryUsecase';
import { IInputCategoryDTO } from '../../../application/DTO/input/IInputCategoryDTO';

export class CreateCategoryController{
    constructor(private readonly createCategoryUsecase: CreateCategoryUsecase){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const inputCategoryDTO: IInputCategoryDTO = req.body
            await this.createCategoryUsecase.handle(inputCategoryDTO)
            return res.status(201).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}