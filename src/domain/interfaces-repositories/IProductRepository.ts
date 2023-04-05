import { Product } from "../entities/Product"
import { PageProductRequest } from '../entities/PageProductRequest';
import { IOutputPageProductResponseDTO } from '../../application/DTO/output/IOutputPageProductResponseDTO';

export interface IProductRepository{
    create(produtc: Product): Promise<void>
    count():Promise<number>
    deleteByCategory(categoriesId: string): Promise<void>
    deleteById(id: string): Promise<void>
    getByName(name: string, pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO>
    getUniqueByName(name: string): Promise<Product>
    getById(id: string): Promise<Product>
    getPageByCategory(categoryId: string, pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO>
    getPage(pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO>
    updateById(produtc: Product): Promise<void>
}