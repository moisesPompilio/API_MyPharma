import { ICategoryRepository } from '../../../../domain/interfaces-repositories/ICategoryRepository';
import { IInputCategoryDTO } from '../../../DTO/input/IInputCategoryDTO';
import { Category } from '../../../../domain/entities/Category';
import { CreateCategoryUsecase } from '../CreateCategoryUsecase';

describe('CreateCategoryUsecase', () => {
    let categoryRepositoryMock: jest.Mocked<ICategoryRepository>;
    let createCategoryUseCase: CreateCategoryUsecase;
    
    beforeEach(() => {
      categoryRepositoryMock = {
        create: jest.fn(),
        deleteById: jest.fn(),
        getAll: jest.fn(),
        getByName: jest.fn(),
        getById: jest.fn(),
        updateById: jest.fn()
      };
      createCategoryUseCase = new CreateCategoryUsecase(categoryRepositoryMock);
    });
  
    it('should create a category', async () => {
        const inputCategoryDTO: IInputCategoryDTO = {
            name: 'category name',
            url_photo: 'category description',
          };
      
          categoryRepositoryMock.getByName.mockResolvedValue(null);
          const expectedCategory = new Category(inputCategoryDTO);
          expectedCategory.id = expect.any(String);
      
          await createCategoryUseCase.handle(inputCategoryDTO);
      
          expect(categoryRepositoryMock.create).toHaveBeenCalledWith(expectedCategory);
    });
  
    it('should throw an error if category name already exists', async () => {
      const inputCategoryDTO: IInputCategoryDTO = {
        name: 'category name',
        url_photo: 'category description',
      };
  
      const existingCategory = new Category(inputCategoryDTO);
  
      categoryRepositoryMock.getByName.mockResolvedValue(existingCategory);
  
      await expect(createCategoryUseCase.handle(inputCategoryDTO)).rejects.toThrow('Category name already exists');
    });
  });