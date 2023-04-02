import { Request, Response } from 'express';

import { DeleteByIdCategoryUseCse } from '../../../application/usecases/CategoryUseCase/DeleteByIdCategoryUseCse';

export class DeleteByCategoryController{
    constructor(private readonly deleteByIdCategoryUseCse: DeleteByIdCategoryUseCse){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const {id} = req.params
            await this.deleteByIdCategoryUseCse.handle(id)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}