import { MongoDBProductRepository } from '../../../infrastructure/implementations-repositories/MongoDB/MongoDBProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { DeleteByIdProductUseCse } from './DeleteByIdProductUseCase';
import { GetPageProductUsecase } from './GetPageProductUsecase';
import { UpdateByIdProductUseCase } from './UpdateByIdProductUseCase';


const mongoDBProductRepository = new MongoDBProductRepository()

export const createProductUseCase = new CreateProductUseCase(mongoDBProductRepository)
export const deleteByIdProductUseCse = new DeleteByIdProductUseCse(mongoDBProductRepository)
export const getPageProductUsecase = new GetPageProductUsecase(mongoDBProductRepository)
export const updateByIdProductUseCase = new UpdateByIdProductUseCase(mongoDBProductRepository)