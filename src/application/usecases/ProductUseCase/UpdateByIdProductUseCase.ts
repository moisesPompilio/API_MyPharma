import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository"
import { IInputProductDTO } from '../../DTO/input/IInputProductDTO';
import { Product } from "../../../domain/entities/Product"

export class UpdateByIdProductUseCase{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(inputProductDTO:IInputProductDTO, id: string) {
        const existingProduct = await this.productRepository.getById(id)
        const productToCheckForDuplicates = await this.productRepository.getUniqueByName(inputProductDTO.name)
        if(!existingProduct){
            return Promise.reject( new Error("Product dos not exist"))
        }else if(this.isProductNameDuplicated(productToCheckForDuplicates, inputProductDTO, id)){
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