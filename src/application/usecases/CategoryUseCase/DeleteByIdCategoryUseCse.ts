import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';

export class DeleteByIdCategoryUseCse{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle(id: string) {
        const existingCategory = await this.categoryRepository.getById(id)
        if(!existingCategory){
            return Promise.reject( new Error("Category dos not exist"))
        }else{
            await this.categoryRepository.deleteById(id);
        }
    }
}