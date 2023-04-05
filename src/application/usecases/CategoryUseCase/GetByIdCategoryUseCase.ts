import { ICategoryRepository } from "../../../domain/interfaces-repositories/ICategoryRepository";
import { Category } from '../../../domain/entities/Category';
import { uuidIsInvalid } from "../../util/uuidIsInvalid";

export class GetByIdCategoryUseCase{
    constructor(private readonly categoryRepository: ICategoryRepository){}
    async handle(id: string): Promise<Category>{
        uuidIsInvalid(id, "id")
        const category = await this.categoryRepository.getById(id)
        if(!category){
            return Promise.reject( new Error("Category dos not exist"))
        }else{
            return category
        }
    }
}