import { MongoDBProductRepository } from '../../../infrastructure/implementations-repositories/MongoDB/MongoDBProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { DeleteByCategoryProductUseCase } from './DeleteByCategoryProductUseCase';
import { DeleteByIdProductUseCse } from './DeleteByIdProductUseCase';
import { GetPageProductUsecase } from './GetPageProductUsecase';
import { UpdateByIdProductUseCase } from './UpdateByIdProductUseCase';
import { getByIdCategoryUseCase } from '../CategoryUseCase/index';


const mongoDBProductRepository = new MongoDBProductRepository()

export const createProductUseCase = new CreateProductUseCase(mongoDBProductRepository, getByIdCategoryUseCase)
export const deleteByCategoryProductUseCase = new DeleteByCategoryProductUseCase(mongoDBProductRepository)
export const deleteByIdProductUseCse = new DeleteByIdProductUseCse(mongoDBProductRepository)
export const getPageProductUsecase = new GetPageProductUsecase(mongoDBProductRepository, getByIdCategoryUseCase)
export const updateByIdProductUseCase = new UpdateByIdProductUseCase(mongoDBProductRepository, getByIdCategoryUseCase)