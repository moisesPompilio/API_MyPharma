import { MongoDBCategoryRepository } from "../../../infrastructure/implementations-repositories/MongoDB/MongoDBCategoryRepository";
import { deleteByCategoryProductUseCase } from "../ProductUseCase";
import { CreateCategoryUsecase } from "./CreateCategoryUsecase";
import { DeleteByIdCategoryUseCse } from './DeleteByIdCategoryUseCse';
import { GetAllCategoryUsecase } from './GetAllCategoryUsecase';
import { GetByIdCategoryUseCase } from "./GetByIdCategoryUseCase";
import { UpdateByIdCategoryUsecase } from './UpdateByIdCategoryUsecase';

const mongoDBCategoryRepository = new MongoDBCategoryRepository()

export const createCategoryUsecase = new CreateCategoryUsecase(mongoDBCategoryRepository)
export const getAllCategoryUsecase = new GetAllCategoryUsecase(mongoDBCategoryRepository)
export const getByIdCategoryUseCase = new GetByIdCategoryUseCase(mongoDBCategoryRepository)
export const updateByIdCategoryUsecase = new UpdateByIdCategoryUsecase(mongoDBCategoryRepository, getByIdCategoryUseCase)
export const deleteByIdCategoryUseCse = new DeleteByIdCategoryUseCse(mongoDBCategoryRepository, getByIdCategoryUseCase, deleteByCategoryProductUseCase)