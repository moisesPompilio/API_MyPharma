import { Category } from "../../../domain/entities/Category";
import { ICategoryRepository } from "../../../domain/interfaces-repositories/ICategoryRepository";
import { prismaClient } from "../../database/prismaClient";

export class MongoDBCategoryRepository implements ICategoryRepository {
    async create(category: Category): Promise<void> {
      await prismaClient.categories.create({ data: category });
    }
  
    async updateById(category: Category): Promise<void> {
      const { id, ...rest } = category;
      await prismaClient.categories.update({
        where: { id },
        data: rest,
      });
    }
  
    async deleteById(id: string): Promise<void> {
      await prismaClient.categories.delete({ where: { id } });
    }
  
    async getAll(): Promise<Category[]> {
      return prismaClient.categories.findMany();
    }
    async getByName(name: string): Promise<Category> {
      return prismaClient.categories.findFirst({where: {name}});
    }
    async getById(id: string): Promise<Category> {
      return prismaClient.categories.findFirst({where: {id}});
    }
  }