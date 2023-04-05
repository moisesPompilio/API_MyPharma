import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository"
import { IInputProductDTO } from '../../DTO/input/IInputProductDTO';
import { Product } from "../../../domain/entities/Product"
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { getByIdCategoryUseCase } from '../CategoryUseCase/index';

export class UpdateByIdProductUseCase{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(inputProductDTO:IInputProductDTO, id: string) {
        uuidIsInvalid(id, "id");
        const existingProduct = await this.productRepository.getById(id)
        if(!existingProduct){
            return Promise.reject( new Error("Product dos not exist"))
        }
        
        uuidIsInvalid(inputProductDTO.categoriesId, "categoriesId");
        await getByIdCategoryUseCase.handle(inputProductDTO.categoriesId)

        const productToCheckForDuplicates = await this.productRepository.getUniqueByName(inputProductDTO.name)
        if(this.isProductNameDuplicated(productToCheckForDuplicates, inputProductDTO, id)){
            return Promise.reject( new Error("Product name is already being used by another Product"))
        }else{
            const product = new Product(inputProductDTO, id)
            await this.productRepository.updateById(product);
        }
    }
    private isProductNameDuplicated(productToCheckForDuplicates: Product, inputProductDTO: IInputProductDTO, id: string): boolean{
        return productToCheckForDuplicates !== null && productToCheckForDuplicates.name === inputProductDTO.name && productToCheckForDuplicates.id !== id
    }
}