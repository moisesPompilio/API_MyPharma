import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';
import { getByIdCategoryUseCase } from './index';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { deleteByCategoryProductUseCase } from '../ProductUseCase/index';

export class DeleteByIdCategoryUseCse{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle(id: string) {
        uuidIsInvalid(id, "id")
            await getByIdCategoryUseCase.handle(id)
            await this.categoryRepository.deleteById(id);
            await deleteByCategoryProductUseCase.handle(id)

    }
}