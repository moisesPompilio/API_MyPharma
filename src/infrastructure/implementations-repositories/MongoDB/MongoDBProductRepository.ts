import { PageProductRequest } from "../../../domain/entities/PageProductRequest";
import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository";
import { prismaClient } from "../../database/prismaClient";

export class MongoDBProductRepository implements IProductRepository {
    async create(product: Product): Promise<void> {
      await prismaClient.products.create({ data: product });
    }
  
    async updateById(product: Product): Promise<void> {
      const { id, ...rest } = product;
      await prismaClient.products.update({
        where: { id },
        data: rest,
      });
    }
  
    async deleteById(id: string): Promise<void> {
      await prismaClient.products.delete({ where: { id } });
    }
    
    async getByName(name: string): Promise<Product[]> {
      return prismaClient.products.findMany({ where: { name} });
    }

    async getUniqueByName(name: string): Promise<Product> {
      const product = await prismaClient.products.findUnique({
        where: { name },
      });
      return new Product(product);
    }
  
    async getPageByCategory(categoriesId: string, pageProductRequest: PageProductRequest): Promise<Product[]> {
      const skip = (pageProductRequest.pageNumber - 1) * pageProductRequest.pageSize;
      return prismaClient.products.findMany({
        where: { categoriesId },
        skip,
        take: pageProductRequest.pageSize,
        orderBy: {[pageProductRequest.orderBy]: pageProductRequest.sortDirection}
      });
    }
  
    async getPage(pageProductRequest: PageProductRequest): Promise<Product[]> {
      const skip = (pageProductRequest.pageNumber - 1) * pageProductRequest.pageSize;
      return prismaClient.products.findMany({
        skip,
        take: pageProductRequest.pageSize,
        orderBy: {[pageProductRequest.orderBy]: pageProductRequest.sortDirection}
      });
    }
    async getById(id: string): Promise<Product>{
      return prismaClient.products.findFirst({ where: { id } });
    }
    async count(): Promise<number> {
      return prismaClient.products.count();
    }
    
  }

  