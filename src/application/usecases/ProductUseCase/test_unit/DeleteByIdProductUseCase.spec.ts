import { IProductRepository } from '../../../../domain/interfaces-repositories/IProductRepository';
import { DeleteByIdProductUseCse } from '../DeleteByIdProductUseCase';
import { Product } from '../../../../domain/entities/Product';

describe('DeleteByIdProductUseCase', () => {
  let productRepository: IProductRepository;
  let deleteByIdProductUseCase: DeleteByIdProductUseCse;

  beforeEach(() => {
    productRepository = {
        getById: jest.fn(),
        deleteById: jest.fn(),
    } as any;
    deleteByIdProductUseCase = new DeleteByIdProductUseCse(productRepository);
  });

  it('should throw an error when the ID is invalid', async () => {
    // Arrange
    const invalidId = 'invalid-id';

    // Act and Assert
    await expect(deleteByIdProductUseCase.handle(invalidId)).rejects.toThrow(
      'invalid id as it is not a uuid',
    );
  });

  it('should return an error when the product does not exist', async () => {
    // Arrange
    const validId = '68be17c1-fd3a-40c6-9ec6-c449cd8dbf5c';
    productRepository.getById = jest.fn().mockResolvedValue(undefined);

    // Act and Assert
    await expect(deleteByIdProductUseCase.handle(validId)).rejects.toThrow(
      'Product dos not exis',
    );
    expect(productRepository.getById).toHaveBeenCalledWith(validId);
    expect(productRepository.deleteById).not.toHaveBeenCalled();
  });

  it('should delete the product when it exists', async () => {
    // Arrange
    const validId = '68be17c1-fd3a-40c6-9ec6-c449cd8dbf5c';
    const existingProduct: Product = { 
        id: validId, name: "Product Test",
        description: "Product Test Description",
        categoriesId: "32917f7f-b2c6-4bb3-9f21-3078214d5ca3",
        url_photo: "url_photo",
        price: 10
    };
    productRepository.getById = jest.fn().mockResolvedValue(existingProduct);

    // Act
    await deleteByIdProductUseCase.handle(validId);

    // Assert
    expect(productRepository.getById).toHaveBeenCalledWith(validId);
    expect(productRepository.deleteById).toHaveBeenCalledWith(validId);
  });
});
