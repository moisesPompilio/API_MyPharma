import { CreateProductController } from './CreateProductController';
import { DeleteByIdProductController } from './DeleteByIdProductController';
import { GetPageProductController } from './GetPageProductController';
import { UpdateByIdProductController } from './UpdateByIdProductController';

import { createProductUseCase, deleteByIdProductUseCse, getPageProductUsecase, updateByIdProductUseCase } from '../../../application/usecases/ProductUseCase/index';

export const createProductController = new CreateProductController(createProductUseCase)
export const deleteByIdProductController = new DeleteByIdProductController(deleteByIdProductUseCse)
export const getPageProductController = new GetPageProductController(getPageProductUsecase)
export const updateByIdProductController = new UpdateByIdProductController(updateByIdProductUseCase)