import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';

export class GetAllCategoryUsecase{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle() {
        const categories = await this.categoryRepository.getAll();
        return categories;
    }
}