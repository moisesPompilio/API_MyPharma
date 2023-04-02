import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/interfaces-repositories/IProductRepository';
import { IInputProductDTO } from '../../DTO/input/IInputProductDTO';
export class CreateProductUseCase{
    constructor(private readonly productRepositorie: IProductRepository){}
    async handle(inputProductDTO:IInputProductDTO) {
        const existingProduct = await this.productRepositorie.getUniqueByName(inputProductDTO.name)
        if(this.productNameExists(existingProduct, inputProductDTO)){
            return Promise.reject( new Error("Product name already exists"))
        }else{
            const product = new Product(inputProductDTO)
            await this.productRepositorie.create(product);
        }
    }
    private productNameExists(existingProduct: Product, inputProductDTO: IInputProductDTO): boolean{
        return existingProduct !== null && existingProduct.name === inputProductDTO.name
    }
}