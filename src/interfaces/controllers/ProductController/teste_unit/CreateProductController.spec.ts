import { Request, Response } from 'express';
import { CreateProductController } from '../CreateProductController';
import { CreateProductUseCase } from '../../../../application/usecases/ProductUseCase/CreateProductUseCase';
import { IInputProductDTO } from '../../../../application/DTO/input/IInputProductDTO';

describe('CreateProductController', () => {
  it('should return status 201 if the product is created successfully', async () => {
    // Arrange
    const req: Partial<Request> = {
      body: { name: 'Test Product', description: 'Test description', price: 10.99, categoryId: '123', url_photo: "url_photo", categoriesId:"categoriesId" }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const createProductUseCase = {
      handle: jest.fn().mockResolvedValue(undefined)
    };
    const createProductController = new CreateProductController(
      createProductUseCase as unknown as CreateProductUseCase
    );

    // Act
    const result = await createProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(createProductUseCase.handle).toHaveBeenCalledWith({ name: 'Test Product', description: 'Test description', price: 10.99, categoryId: '123', url_photo: "url_photo", categoriesId:"categoriesId" } as IInputProductDTO);
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {
      body: {
        name: 'Test Product',
        description: 'Test description',
        price: '10.99',
        categoryId: '123'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const createProductUseCase = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
    };
    const createProductController = new CreateProductController(
      createProductUseCase as unknown as CreateProductUseCase
    );

    // Act
    const result = await createProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
    expect(createProductUseCase.handle).toHaveBeenCalledWith({ name: 'Test Product', description: 'Test description', price: 10.99, categoryId: '123' } );
  });
});
