import { PageProductRequest } from "../../../domain/entities/PageProductRequest";
import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository";
import { IInputPageProductRequestDTO } from "../../DTO/input/IInputPageProductRequestDTO";
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { GetByIdCategoryUseCase } from '../CategoryUseCase/GetByIdCategoryUseCase';

export class GetPageProductUsecase{
    constructor(private readonly productRepository: IProductRepository, private readonly getByIdCategoryUseCase: GetByIdCategoryUseCase){}
    async handle(inputPageProduct?: IInputPageProductRequestDTO, categoryId?: string, searchByName?: string) {
        const pageProductRequest = new PageProductRequest(inputPageProduct)
        if(categoryId !== undefined){
            uuidIsInvalid(categoryId, "categoriesId");
            await this.getByIdCategoryUseCase.handle(categoryId)
            return await this.productRepository.getPageByCategory(categoryId, pageProductRequest);
        }else if(searchByName !== undefined){
            return await this.productRepository.getByName(searchByName, pageProductRequest)
        }else{
            return await this.productRepository.getPage(pageProductRequest);
        }
    }
}