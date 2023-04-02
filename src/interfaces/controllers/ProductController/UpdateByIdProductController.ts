import { Request, Response } from "express"

import { UpdateByIdProductUseCase } from "../../../application/usecases/ProductUseCase/UpdateByIdProductUseCase"
import { IInputProductDTO } from "../../../application/DTO/input/IInputProductDTO"

export class UpdateByIdProductController{
    constructor(private readonly updateByIdProductUsecase: UpdateByIdProductUseCase){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            const inputProductDTO: IInputProductDTO = req.body
            const {id} = req.params
            await this.updateByIdProductUsecase.handle(inputProductDTO, id)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}