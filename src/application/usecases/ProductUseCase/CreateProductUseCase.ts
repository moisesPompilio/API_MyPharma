import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/interfaces-repositories/IProductRepository';
import { IInputProductDTO } from '../../DTO/input/IInputProductDTO';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { GetByIdCategoryUseCase } from '../CategoryUseCase/GetByIdCategoryUseCase';
export class CreateProductUseCase{
    constructor(private readonly productRepositorie: IProductRepository, private readonly  getByIdCategoryUseCase: GetByIdCategoryUseCase){}
    async handle(inputProductDTO:IInputProductDTO):Promise<void> {
        uuidIsInvalid(inputProductDTO.categoriesId, "categoriesId");
        if (this.getByIdCategoryUseCase !== undefined) {
            await this.getByIdCategoryUseCase.handle(inputProductDTO.categoriesId)
          }
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