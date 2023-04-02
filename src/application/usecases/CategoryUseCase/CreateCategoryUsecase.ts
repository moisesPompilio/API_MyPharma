import { ICategoryRepository } from '../../../domain/interfaces-repositories/ICategoryRepository';
import { IInputCategoryDTO } from '../../DTO/input/IInputCategoryDTO';
import { Category } from '../../../domain/entities/Category';

export class CreateCategoryUsecase{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle(inputCategoryDTO:IInputCategoryDTO) {
        const existingCategory = await this.categoryRepository.getByName(inputCategoryDTO.name)
        if(this.categoryNameExists(existingCategory, inputCategoryDTO)){
            return Promise.reject( new Error("Category name already exists"))
        }else{
            const category = new Category(inputCategoryDTO)
            await this.categoryRepository.create(category);
        }
    }
    private categoryNameExists(existingCategory: Category, inputCategoryDTO: IInputCategoryDTO): boolean{
        return existingCategory !== null && existingCategory.name === inputCategoryDTO.name
    }
}