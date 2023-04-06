import { Request, Response } from 'express';
import { UpdateByIdCategoryController } from '../UpdateByIdCategoryController';
import { UpdateByIdCategoryUsecase } from '../../../../application/usecases/CategoryUseCase/UpdateByIdCategoryUsecase';
import { IInputCategoryDTO } from '../../../../application/DTO/input/IInputCategoryDTO';

describe('UpdateByIdCategoryController', () => {
  it('should return status 204 if the category is updated successfully', async () => {
    // Arrange
    const req: Partial<Request> = {
      body: {
        name: 'Updated Test Category'
      },
      params: {
        id: 'category-id'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const updateByIdCategoryUseCase = {
      handle: jest.fn().mockResolvedValue(undefined)
    };
    const updateByIdCategoryController = new UpdateByIdCategoryController(
      updateByIdCategoryUseCase as unknown as UpdateByIdCategoryUsecase
    );

    // Act
    const result = await updateByIdCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(updateByIdCategoryUseCase.handle).toHaveBeenCalledWith(
      { name: 'Updated Test Category' } as IInputCategoryDTO,
      'category-id'
    );
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {
      body: {
        name: 'Test Category'
      },
      params: {
        id: 'category-id'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const updateByIdCategoryUseCase = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const updateByIdCategoryController = new UpdateByIdCategoryController(
      updateByIdCategoryUseCase as unknown as UpdateByIdCategoryUsecase
    );

    // Act
    const result = await updateByIdCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(updateByIdCategoryUseCase.handle).toHaveBeenCalledWith(
      { name: 'Test Category' } as IInputCategoryDTO,
      'category-id'
    );
  });
});
