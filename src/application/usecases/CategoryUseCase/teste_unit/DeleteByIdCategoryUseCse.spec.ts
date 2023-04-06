import { ICategoryRepository } from '../../../../domain/interfaces-repositories/ICategoryRepository';
import { GetByIdCategoryUseCase } from '../GetByIdCategoryUseCase';
import { DeleteByCategoryProductUseCase } from '../../ProductUseCase/DeleteByCategoryProductUseCase';
import { DeleteByIdCategoryUseCse } from '../DeleteByIdCategoryUseCse';
import { IProductRepository } from '../../../../domain/interfaces-repositories/IProductRepository';

describe('DeleteByIdCategoryUseCse', () => {
  let categoryRepositoryMock: jest.Mocked<ICategoryRepository>;
  let getByIdCategoryUseCaseMock: jest.Mocked<GetByIdCategoryUseCase>;
  let deleteByCategoryProductUseCaseMock: jest.Mocked<DeleteByCategoryProductUseCase>;
  let deleteByIdCategoryUseCse: DeleteByIdCategoryUseCse;

  beforeEach(() => {
    categoryRepositoryMock = {
      create: jest.fn(),
      deleteById: jest.fn(),
      getAll: jest.fn(),
      getByName: jest.fn(),
      getById: jest.fn(),
      updateById: jest.fn(),
    };
    const productRepositoryMock: jest.Mocked<IProductRepository> = {
        create: jest.fn(),
        count: jest.fn(),
        deleteByCategory: jest.fn(),
        deleteById: jest.fn(),
        getByName: jest.fn(),
        getUniqueByName: jest.fn(),
        getById: jest.fn(),
        getPageByCategory: jest.fn(),
        getPage: jest.fn(),
        updateById: jest.fn(),
    }
    getByIdCategoryUseCaseMock = {
      handle: jest.fn(),
      categoryRepository: categoryRepositoryMock,
    } as unknown as jest.Mocked<GetByIdCategoryUseCase>;
    deleteByCategoryProductUseCaseMock = {
      handle: jest.fn(),
      productRepository: productRepositoryMock,
    }as unknown as jest.Mocked<DeleteByCategoryProductUseCase>;
    deleteByIdCategoryUseCse = new DeleteByIdCategoryUseCse(
      categoryRepositoryMock,
      getByIdCategoryUseCaseMock,
      deleteByCategoryProductUseCaseMock
    );
  });

  it('should delete a category and its products successfully', async () => {
    const categoryId = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';
    const category = {
      id: categoryId,
      name: 'category_name',
      url_photo: 'category_photo',
    };

    getByIdCategoryUseCaseMock.handle.mockResolvedValue(category);

    await deleteByIdCategoryUseCse.handle(categoryId);

    expect(getByIdCategoryUseCaseMock.handle).toHaveBeenCalledWith(categoryId);
    expect(categoryRepositoryMock.deleteById).toHaveBeenCalledWith(categoryId);
    expect(deleteByCategoryProductUseCaseMock.handle).toHaveBeenCalledWith(categoryId);
  });
});
