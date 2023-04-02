import { Product } from "../entities/Product"
import { PageProductRequest } from '../entities/PageProductRequest';

export interface IProductRepository{
    create(produtc: Product): Promise<void>
    updateById(produtc: Product): Promise<void>
    deleteById(id: string): Promise<void>
    getByName(name: string): Promise<Product[]>
    getUniqueByName(name: string): Promise<Product>
    getById(id: string): Promise<Product>
    getPageByCategory(categoryId: string, pageProductRequest: PageProductRequest): Promise<Product[]>
    getPage(pageProductRequest: PageProductRequest): Promise<Product[]>
    count():Promise<number>
}