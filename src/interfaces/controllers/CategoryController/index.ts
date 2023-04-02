import { CreateCategoryController } from "./CreateCategoryController";
import { DeleteByCategoryController } from './DeleteByCategoryController';
import { GetAllCategoryController } from './GetAllCategoryController';
import { UpdateByIdCategoryController } from './UpdateByIdCategoryController';

import { getAllCategoryUsecase, deleteByIdCategoryUseCse, createCategoryUsecase, updateByIdCategoryUsecase } from '../../../application/usecases/CategoryUseCase/index';

export const createCategoryController = new CreateCategoryController(createCategoryUsecase)
export const deleteByCategoryController = new DeleteByCategoryController(deleteByIdCategoryUseCse)
export const getAllCategoryController = new GetAllCategoryController(getAllCategoryUsecase)
export const updateByIdCategoryController = new UpdateByIdCategoryController(updateByIdCategoryUsecase)
