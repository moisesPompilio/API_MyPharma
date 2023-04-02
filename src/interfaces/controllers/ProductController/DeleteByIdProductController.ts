import { Request, Response } from "express"

import { DeleteByIdProductUseCse } from '../../../application/usecases/ProductUseCase/DeleteByIdProductUseCase';

export class DeleteByIdProductController{
    constructor(private readonly deleteByIdProductUseCse: DeleteByIdProductUseCse){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const {id} = req.params
            await this.deleteByIdProductUseCse.handle(id)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}