import { Request, Response } from 'express';
import { CreateCategoryUsecase } from '../../../../application/usecases/CategoryUseCase/CreateCategoryUsecase';
import { CreateCategoryController } from '../CreateCategoryController';
import { IInputCategoryDTO } from '../../../../application/DTO/input/IInputCategoryDTO';

describe('CreateCategoryController', () => {
    it('should return status 201 if the category is created successfully', async () => {
      // Arrange
      const req: Partial<Request> = {
        body: {
          name: 'Test Category'
        }
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      const createCategoryUseCase = {
        handle: jest.fn().mockResolvedValue(undefined)
      };
      const createCategoryController = new CreateCategoryController(
        createCategoryUseCase as unknown as CreateCategoryUsecase
      );
  
      // Act
      const result = await createCategoryController.invoke(req as Request, res as Response);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalled();
      expect(createCategoryUseCase.handle).toHaveBeenCalledWith({ name: 'Test Category' } as IInputCategoryDTO);
    });
  
    it('should return status 500 if an error occurs', async () => {
      // Arrange
      const req: Partial<Request> = {
        body: {
          name: 'Test Category'
        }
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const createCategoryUseCase = {
        handle: jest.fn().mockRejectedValue(new Error('Something went wrong'))
      };
      const createCategoryController = new CreateCategoryController(
        createCategoryUseCase as unknown as CreateCategoryUsecase
      );
  
      // Act
      const result = await createCategoryController.invoke(req as Request, res as Response);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Something went wrong'
      });
      expect(createCategoryUseCase.handle).toHaveBeenCalledWith({ name: 'Test Category' } as IInputCategoryDTO);
    });
  });