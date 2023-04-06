import { ICategoryRepository } from "../../../../domain/interfaces-repositories/ICategoryRepository";
import { Category } from '../../../../domain/entities/Category';
import { GetByIdCategoryUseCase } from '../GetByIdCategoryUseCase';

describe('GetByIdCategoryUseCase', () => {
  let categoryRepositoryMock: jest.Mocked<ICategoryRepository>;
  let getByIdCategoryUseCase: GetByIdCategoryUseCase;
  
  beforeEach(() => {
    categoryRepositoryMock = {
      create: jest.fn(),
      deleteById: jest.fn(),
      getAll: jest.fn(),
      getByName: jest.fn(),
      getById: jest.fn(),
      updateById: jest.fn()
    };
    getByIdCategoryUseCase = new GetByIdCategoryUseCase(categoryRepositoryMock);
  });

  it('should return a category if id exists', async () => {
    const id = 'd4180e24-c7c8-4f28-a9ac-54f17a5bb1b5';
    const category = new Category({
      name: 'category name',
      url_photo: 'category description',
    }, id);

    categoryRepositoryMock.getById.mockResolvedValue(category);

    const result = await getByIdCategoryUseCase.handle(id);

    expect(result).toEqual(category);
    expect(categoryRepositoryMock.getById).toHaveBeenCalledWith(id);
  });

  it('should reject with an error if id does not exist', async () => {
    const id = 'd4180e24-c7c8-4f28-a9ac-54f17a5bb1b5';
    
    categoryRepositoryMock.getById.mockResolvedValue(null);

    await expect(getByIdCategoryUseCase.handle(id)).rejects.toThrow('Category dos not exist');
    expect(categoryRepositoryMock.getById).toHaveBeenCalledWith(id);
  });
});
