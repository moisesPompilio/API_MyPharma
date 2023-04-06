import { Request, Response } from 'express';
import { DeleteByCategoryController } from '../DeleteByCategoryController';
import { DeleteByIdCategoryUseCse } from '../../../../application/usecases/CategoryUseCase/DeleteByIdCategoryUseCse';

describe('DeleteByCategoryController', () => {
  it('should return status 204 if the category is deleted successfully', async () => {
    // Arrange
    const req: Partial<Request> = {
      params: {
        id: 'category-id'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const deleteByIdCategoryUseCse = {
      handle: jest.fn().mockResolvedValue(undefined)
    };
    const deleteByCategoryController = new DeleteByCategoryController(
      deleteByIdCategoryUseCse as unknown as DeleteByIdCategoryUseCse
    );

    // Act
    const result = await deleteByCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(deleteByIdCategoryUseCse.handle).toHaveBeenCalledWith('category-id');
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {
      params: {
        id: 'category-id'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const deleteByIdCategoryUseCse = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const deleteByCategoryController = new DeleteByCategoryController(
      deleteByIdCategoryUseCse as unknown as DeleteByIdCategoryUseCse
    );

    // Act
    const result = await deleteByCategoryController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(deleteByIdCategoryUseCse.handle).toHaveBeenCalledWith('category-id');
  });
});
