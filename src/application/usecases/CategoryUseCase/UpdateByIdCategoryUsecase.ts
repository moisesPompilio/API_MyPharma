import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';
import { IInputCategoryDTO } from '../../DTO/input/IInputCategoryDTO';
import { Category } from '../../../domain/entities/Category';

export class UpdateByIdCategoryUsecase{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle(inputCategoryDTO:IInputCategoryDTO, id: string) {
        const existingCategory = await this.categoryRepository.getById(id)
        const categoryToCheckForDuplicates = await this.categoryRepository.getByName(inputCategoryDTO.name)
        if(!existingCategory){
            return Promise.reject( new Error("Category dos not exist"))
        }else if(this.isCategoryNameDuplicated(categoryToCheckForDuplicates, inputCategoryDTO, id)){
            return Promise.reject( new Error("Category name is already being used by another category"))
        }else{
            const category = new Category(inputCategoryDTO, id)
            await this.categoryRepository.updateById(category);
        }
    }
    private isCategoryNameDuplicated(categoryToCheckForDuplicates: Category, inputCategoryDTO: IInputCategoryDTO, id: string): boolean{
        return categoryToCheckForDuplicates !== null && categoryToCheckForDuplicates.name === inputCategoryDTO.name && categoryToCheckForDuplicates.id !== id
    }
}