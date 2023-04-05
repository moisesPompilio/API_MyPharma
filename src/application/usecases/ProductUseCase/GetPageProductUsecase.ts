import { PageProductRequest } from "../../../domain/entities/PageProductRequest";
import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository";
import { IInputPageProductRequestDTO } from "../../DTO/input/IInputPageProductRequestDTO";
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { getByIdCategoryUseCase } from '../CategoryUseCase/index';

export class GetPageProductUsecase{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(inputPageProduct?: IInputPageProductRequestDTO, categoryId?: string, searchByName?: string) {
        const pageProductRequest = new PageProductRequest(inputPageProduct)
        if(categoryId !== undefined){
            uuidIsInvalid(categoryId, "categoriesId");
            await getByIdCategoryUseCase.handle(categoryId)
            return await this.productRepository.getPageByCategory(categoryId, pageProductRequest);
        }else if(searchByName !== undefined){
            return await this.productRepository.getByName(searchByName, pageProductRequest)
        }else{
            return await this.productRepository.getPage(pageProductRequest);
        }
    }
}