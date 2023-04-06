import { IProductRepository } from '../../../domain/interfaces-repositories/IProductRepository';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
export class DeleteByIdProductUseCse{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(id: string): Promise<void> {
        uuidIsInvalid(id, "id")
        const existingProduct = await this.productRepository.getById(id)
        if(!existingProduct){
            return Promise.reject( new Error("Product dos not exist"))
        }else{
            await this.productRepository.deleteById(id);
        }
    }
}