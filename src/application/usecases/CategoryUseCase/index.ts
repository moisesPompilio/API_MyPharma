import { MongoDBCategoryRepository } from "../../../infrastructure/implementations-repositories/MongoDB/MongoDBCategoryRepository";
import { CreateCategoryUsecase } from "./CreateCategoryUsecase";
import { DeleteByIdCategoryUseCse } from './DeleteByIdCategoryUseCse';
import { GetAllCategoryUsecase } from './GetAllCategoryUsecase';
import { UpdateByIdCategoryUsecase } from './UpdateByIdCategoryUsecase';

const mongoDBCategoryRepository = new MongoDBCategoryRepository()

export const createCategoryUsecase = new CreateCategoryUsecase(mongoDBCategoryRepository)
export const deleteByIdCategoryUseCse = new DeleteByIdCategoryUseCse(mongoDBCategoryRepository)
export const getAllCategoryUsecase = new GetAllCategoryUsecase(mongoDBCategoryRepository)
export const updateByIdCategoryUsecase = new UpdateByIdCategoryUsecase(mongoDBCategoryRepository)