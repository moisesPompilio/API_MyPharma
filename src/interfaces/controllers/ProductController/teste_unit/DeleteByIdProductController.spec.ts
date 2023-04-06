import { Request, Response } from 'express';
import { DeleteByIdProductController } from '../DeleteByIdProductController';
import { DeleteByIdProductUseCse } from '../../../../application/usecases/ProductUseCase/DeleteByIdProductUseCase';

describe('DeleteByIdProductController', () => {
  it('should return status 204 if the product is deleted successfully', async () => {
    // Arrange
    const req: Partial<Request> = {
      params: {
        id: '123'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const deleteByIdProductUseCse = {
      handle: jest.fn().mockResolvedValue(undefined)
    };
    const deleteByIdProductController = new DeleteByIdProductController(
      deleteByIdProductUseCse as unknown as DeleteByIdProductUseCse
    );

    // Act
    const result = await deleteByIdProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(deleteByIdProductUseCse.handle).toHaveBeenCalledWith('123');
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {
      params: {
        id: '123'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const deleteByIdProductUseCse = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const deleteByIdProductController = new DeleteByIdProductController(
      deleteByIdProductUseCse as unknown as DeleteByIdProductUseCse
    );

    // Act
    const result = await deleteByIdProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(deleteByIdProductUseCse.handle).toHaveBeenCalledWith('123');
  });
});
