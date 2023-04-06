import { ICategoryRepository } from '../../../../domain/interfaces-repositories/ICategoryRepository';
import { Category } from '../../../../domain/entities/Category';
import { GetAllCategoryUsecase } from '../GetAllCategoryUsecase';

describe('GetAllCategoryUsecase', () => {
  let categoryRepositoryMock: jest.Mocked<ICategoryRepository>;
  let getAllCategoryUseCase: GetAllCategoryUsecase;

  beforeEach(() => {
    categoryRepositoryMock = {
      create: jest.fn(),
      deleteById: jest.fn(),
      getAll: jest.fn(),
      getByName: jest.fn(),
      getById: jest.fn(),
      updateById: jest.fn()
    };
    getAllCategoryUseCase = new GetAllCategoryUsecase(categoryRepositoryMock);
  });

  it('should return all categories', async () => {
    const categories = [
      new Category({ name: 'Category 1', url_photo: 'category1.jpg' }),
      new Category({ name: 'Category 2', url_photo: 'category2.jpg' })
    ];
    categoryRepositoryMock.getAll.mockResolvedValue(categories);

    const result = await getAllCategoryUseCase.handle();

    expect(result).toEqual(categories);
    expect(categoryRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an error if categoryRepository.getAll() throws', async () => {
    const errorMessage = 'Error getting categories';
    categoryRepositoryMock.getAll.mockRejectedValue(new Error(errorMessage));
  
    await expect(getAllCategoryUseCase.handle()).rejects.toThrow(errorMessage);
  });
});
