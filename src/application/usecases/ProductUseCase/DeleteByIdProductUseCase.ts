import { IProductRepository } from '../../../domain/interfaces-repositories/IProductRepository';
export class DeleteByIdProductUseCse{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(id: string) {
        const existingProduct = await this.productRepository.getById(id)
        if(!existingProduct){
            return Promise.reject( new Error("Product dos not exist"))
        }else{
            await this.productRepository.deleteById(id);
        }
    }
}