import { Request, Response } from 'express';

import { IInputCategoryDTO } from '../../../application/DTO/input/IInputCategoryDTO';
import { UpdateByIdCategoryUsecase } from '../../../application/usecases/CategoryUseCase/UpdateByIdCategoryUsecase';

export class UpdateByIdCategoryController{
    constructor(private readonly updateByIdCategoryUsecase: UpdateByIdCategoryUsecase){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const inputCategoryDTO: IInputCategoryDTO = req.body
            const {id} = req.params
            await this.updateByIdCategoryUsecase.handle(inputCategoryDTO, id)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}