import { Request, Response } from 'express';
import { GetPageProductController } from '../GetPageProductController';
import { GetPageProductUsecase } from '../../../../application/usecases/ProductUseCase/GetPageProductUsecase';
import { covertQueryInInputPageProductDTO } from '../../../../application/util/covertQueryInInputPageProductDTO';

describe('GetPageProductController', () => {
  it('should return status 200 with products data if the request is successful', async () => {
    // Arrange
    const req: Partial<Request> = {
      query: {
        categoryId: '123',
        searchByName: 'test',
        pageNumber: '1',
        pageSize: '10',
        sortDirection: 'asc',
        orderBy: 'name',
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const getPageProductUseCase = {
      handle: jest.fn().mockResolvedValue({
        totalPages: 5,
        products: [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }],
      }),
    };
    const getPageProductController = new GetPageProductController(
      getPageProductUseCase as unknown as GetPageProductUsecase,
    );

    // Act
    const result = await getPageProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      totalPages: 5,
      products: [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }],
    });
    expect(getPageProductUseCase.handle).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10,
      sortDirection: 'asc',
      orderBy: 'name',
    }, '123', 'test');
  });

  it('should return status 500 if an error occurs', async () => {
    // Arrange
    const req: Partial<Request> = {
      query: {
        pageNumber: '1',
        pageSize: '10',
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const getPageProductUseCase = {
      handle: jest.fn().mockRejectedValue(new Error('Something went wrong')),
    };
    const getPageProductController = new GetPageProductController(
      getPageProductUseCase as unknown as GetPageProductUsecase,
    );

    // Act
    const result = await getPageProductController.invoke(req as Request, res as Response);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong',
    });
    expect(getPageProductUseCase.handle).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10,
    }, undefined, undefined);
  });
});
