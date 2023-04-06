import { Request, Response } from 'express';
import { GetAllCategoryController } from '../GetAllCategoryController';
import { GetAllCategoryUsecase } from '../../../../application/usecases/CategoryUseCase/GetAllCategoryUsecase';

describe('GetAllCategoryController', () => {
  it('should return status 200 and a list of categories', async () => {
    // Arrange
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const getAllCategoryUseCase = {
      handle: jest.fn().mockResolvedValue([{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }])
    };
    const getAllCategoryController = new GetAllCategoryController(
      getAllCategoryUseCase as unknown as GetAllCategoryUsecase
    );

    // Act
    const result = await getAllCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]);
    expect(getAllCategoryUseCase.handle).toHaveBeenCalled();
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const getAllCategoryUseCase = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const getAllCategoryController = new GetAllCategoryController(
      getAllCategoryUseCase as unknown as GetAllCategoryUsecase
    );

    // Act
    const result = await getAllCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(getAllCategoryUseCase.handle).toHaveBeenCalled();
  });
});
