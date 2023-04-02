import { PageProductRequest } from "../../../domain/entities/PageProductRequest";
import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository";
import { IInputPageProductRequestDTO } from "../../DTO/input/IInputPageProductRequestDTO";

export class GetPageProductUsecase{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(inputPageProduct?: IInputPageProductRequestDTO, categoryId?: string) {
        const pageProductRequest = new PageProductRequest(inputPageProduct)
        if(categoryId === undefined){
            return await this.productRepository.getPage(pageProductRequest);
        }else{
            return await this.productRepository.getPageByCategory(categoryId, pageProductRequest);
        }
    }
}