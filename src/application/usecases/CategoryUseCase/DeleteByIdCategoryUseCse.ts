import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { GetByIdCategoryUseCase } from './GetByIdCategoryUseCase';
import { DeleteByCategoryProductUseCase } from '../ProductUseCase/DeleteByCategoryProductUseCase';

export class DeleteByIdCategoryUseCse{
    constructor(private readonly categoryRepository: ICategoryRepository, private readonly getByIdCategoryUseCase: GetByIdCategoryUseCase, private readonly deleteByCategoryProductUseCase: DeleteByCategoryProductUseCase){}
    async handle(id: string) {
        uuidIsInvalid(id, "id")
        await this.getByIdCategoryUseCase.handle(id)
        await this.categoryRepository.deleteById(id);
        await this.deleteByCategoryProductUseCase.handle(id)

    }
}