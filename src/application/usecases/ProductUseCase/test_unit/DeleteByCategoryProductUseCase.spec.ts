import { IProductRepository } from '../../../../domain/interfaces-repositories/IProductRepository';
import { DeleteByCategoryProductUseCase } from '../DeleteByCategoryProductUseCase';

describe('DeleteByCategoryProductUseCase', () => {
  const productRepositoryMock: jest.Mocked<IProductRepository> = {
    deleteByCategory: jest.fn(),
  } as any;

  const deleteByCategoryProductUseCase = new DeleteByCategoryProductUseCase(
    productRepositoryMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should delete products by category ID', async () => {
    // Arrange
    const categoryId = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';

    // Act
    await deleteByCategoryProductUseCase.handle(categoryId);

    // Assert
    expect(productRepositoryMock.deleteByCategory).toHaveBeenCalledWith(categoryId);
  });

  it('should throw an error if category ID is invalid', async () => {
    // Arrange
    const categoryId = '';

    // Act & Assert
    await expect(deleteByCategoryProductUseCase.handle(categoryId)).rejects.toThrowError(
      'invalid categoryId as it is not a uuid',
    );
    expect(productRepositoryMock.deleteByCategory).not.toHaveBeenCalled();
  });
});
