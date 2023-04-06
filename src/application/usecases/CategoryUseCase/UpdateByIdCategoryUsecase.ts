import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';
import { IInputCategoryDTO } from '../../DTO/input/IInputCategoryDTO';
import { Category } from '../../../domain/entities/Category';
import { uuidIsInvalid } from '../../util/uuidIsInvalid';
import { GetByIdCategoryUseCase } from './GetByIdCategoryUseCase';

export class UpdateByIdCategoryUsecase{
    constructor(private readonly categoryRepository: ICategoryRepository, private readonly getByIdCategoryUseCase: GetByIdCategoryUseCase){}
    async handle(inputCategoryDTO:IInputCategoryDTO, id: string) {
        uuidIsInvalid(id, "id")
        await this.getByIdCategoryUseCase.handle(id)
        const categoryToCheckForDuplicates = await this.categoryRepository.getByName(inputCategoryDTO.name)
        if(this.isCategoryNameDuplicated(categoryToCheckForDuplicates, inputCategoryDTO, id)){
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