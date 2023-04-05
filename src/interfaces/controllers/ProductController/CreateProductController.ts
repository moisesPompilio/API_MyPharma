import { Request, Response } from "express"

import { CreateProductUseCase } from '../../../application/usecases/ProductUseCase/CreateProductUseCase';
import { IInputProductDTO } from '../../../application/DTO/input/IInputProductDTO';

export class CreateProductController{
    constructor(private readonly createProductUsecase: CreateProductUseCase){}
    async invoke(req: Request, res: Response ): Promise<Response>{
        try {
            var inputProductDTO: IInputProductDTO = req.body
            inputProductDTO.price = Number(inputProductDTO.price)
            await this.createProductUsecase.handle(inputProductDTO)
            return res.status(201).send()
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Unexpected error"
              })
        }
    }
}