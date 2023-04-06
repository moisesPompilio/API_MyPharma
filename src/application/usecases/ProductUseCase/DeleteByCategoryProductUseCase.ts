import { IProductRepository } from '../../../domain/interfaces-repositories/IProductRepository';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';

export class DeleteByCategoryProductUseCase{
    constructor(private readonly productRepository: IProductRepository){}
    async handle(categoryId: string):Promise<void> {
        uuidIsInvalid(categoryId, "categoryId")
        await this.productRepository.deleteByCategory(categoryId);
    }
}