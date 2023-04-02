import { Category } from "../entities/Category"

export interface ICategoryRepository{
    create(category: Category): Promise<void>
    deleteById(id: string): Promise<void>
    getAll(): Promise<Category[]>
    getByName(name: string): Promise<Category>
    getById(name: string): Promise<Category>
    updateById(category: Category): Promise<void>
}
