import { Request, Response } from 'express';
import { UpdateByIdProductController } from '../UpdateByIdProductController';
import { UpdateByIdProductUseCase } from '../../../../application/usecases/ProductUseCase/UpdateByIdProductUseCase';
import { IInputProductDTO } from '../../../../application/DTO/input/IInputProductDTO';

describe('UpdateByIdProductController', () => {
  it('should return status 204 if the product is updated successfully', async () => {
    // Arrange
    const inputProductDTO: IInputProductDTO = {
      name: 'Test Product',
      price: 10.99,
      categoriesId: '123456789',
      url_photo: "url_phot"
    };
    const req: Partial<Request> = {
      body: inputProductDTO,
      params: {
        id: '123456789'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const updateByIdProductUseCase = {
      handle: jest.fn().mockResolvedValue(undefined)
    };
    const updateByIdProductController = new UpdateByIdProductController(
      updateByIdProductUseCase as unknown as UpdateByIdProductUseCase
    );

    // Act
    const result = await updateByIdProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(updateByIdProductUseCase.handle).toHaveBeenCalledWith(inputProductDTO, '123456789');
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const inputProductDTO: IInputProductDTO = {
      name: 'Test Product',
      price: 10.99,
      categoriesId: '123456789',
      url_photo: "url_phot"
    };
    const req: Partial<Request> = {
      body: inputProductDTO,
      params: {
        id: '123456789'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const updateByIdProductUseCase = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const updateByIdProductController = new UpdateByIdProductController(
      updateByIdProductUseCase as unknown as UpdateByIdProductUseCase
    );

    // Act
    const result = await updateByIdProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(updateByIdProductUseCase.handle).toHaveBeenCalledWith(inputProductDTO, '123456789');
  });
});
