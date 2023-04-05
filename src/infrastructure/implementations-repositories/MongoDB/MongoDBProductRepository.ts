import { PageProductRequest } from "../../../domain/entities/PageProductRequest";
import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/interfaces-repositories/IProductRepository";
import { prismaClient } from "../../database/prismaClient";
import { calculateTotalPages } from '../../../application/util/calculateTotalPages';
import { IOutputPageProductResponseDTO } from '../../../application/DTO/output/IOutputPageProductResponseDTO';

export class MongoDBProductRepository implements IProductRepository {
    async create(product: Product): Promise<void> {
      await prismaClient.products.create({ data: product });
    }
    
    async count(): Promise<number> {
      return prismaClient.products.count();
    }
    
    async deleteById(id: string): Promise<void> {
      await prismaClient.products.delete({ where: { id } });
    }
    
    async deleteByCategory(categoriesId: string): Promise<void>{
      await prismaClient.products.deleteMany({where: {categoriesId}})
    }

    async getByName(name: string, pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO> {
      const skip = (pageProductRequest.pageNumber - 1) * pageProductRequest.pageSize;
      const coutProduct = await prismaClient.products.count({
        where: { name:{
          startsWith: name,
          mode: 'insensitive'
        } 
      }
      });
      const products = await prismaClient.products.findMany({ 
        where: { name:{
          startsWith: name,
          mode: 'insensitive'
        } 
      },
        skip,
        take: pageProductRequest.pageSize,
        orderBy: {[pageProductRequest.orderBy]: pageProductRequest.sortDirection}
      });
      return {
        totalPages: calculateTotalPages(coutProduct, pageProductRequest.pageSize),
        products
      }
    }

    async getUniqueByName(name: string): Promise<Product> {
      const product = await prismaClient.products.findUnique({
        where: { name },
      });
      return new Product(product);
    }
    
    async getPageByCategory(categoriesId: string, pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO> {
      const skip = (pageProductRequest.pageNumber - 1) * pageProductRequest.pageSize;
      const coutProduct = await prismaClient.products.count({where: { categoriesId }})
      const products = await prismaClient.products.findMany({
        where: { categoriesId },
        skip,
        take: pageProductRequest.pageSize,
        orderBy: {[pageProductRequest.orderBy]: pageProductRequest.sortDirection}
      });
      return {
        totalPages: calculateTotalPages(coutProduct, pageProductRequest.pageSize),
        products
      }
    }
    
    async getPage(pageProductRequest: PageProductRequest): Promise<IOutputPageProductResponseDTO> {
      const skip = (pageProductRequest.pageNumber - 1) * pageProductRequest.pageSize;
      const coutProduct = await prismaClient.products.count()
      const products = await prismaClient.products.findMany({
        skip,
        take: pageProductRequest.pageSize,
        orderBy: {[pageProductRequest.orderBy]: pageProductRequest.sortDirection}
      });
      return {
        totalPages: calculateTotalPages(coutProduct, pageProductRequest.pageSize),
        products
      }
    }
    async getById(id: string): Promise<Product>{
      return prismaClient.products.findFirst({ where: { id } });
    }
    async updateById(product: Product): Promise<void> {
      const { id, ...rest } = product;
      await prismaClient.products.update({
        where: { id },
        data: rest,
      });
    }
    
  }

  