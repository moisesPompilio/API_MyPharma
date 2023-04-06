import { UpdateByIdProductUseCase } from '../UpdateByIdProductUseCase';
import { IProductRepository } from '../../../../domain/interfaces-repositories/IProductRepository';
import { Product } from '../../../../domain/entities/Product';
import { IInputProductDTO } from '../../../DTO/input/IInputProductDTO';
import { GetByIdCategoryUseCase } from '../../CategoryUseCase/GetByIdCategoryUseCase';

describe('UpdateByIdProductUseCase', () => {
  let updateByIdProductUseCase: UpdateByIdProductUseCase;
  let productRepositoryMock: IProductRepository;
  let getByIdCategoryUseCaseMock: GetByIdCategoryUseCase;

  beforeEach(() => {
    productRepositoryMock = {
      getById: jest.fn(),
      updateById: jest.fn(),
      getUniqueByName: jest.fn(),
    }as any;
    getByIdCategoryUseCaseMock = {
      handle: jest.fn(),
    }as any;
    updateByIdProductUseCase = new UpdateByIdProductUseCase(productRepositoryMock, getByIdCategoryUseCaseMock);
  });

  describe('handle', () => {
    const id = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';
    const productDTO: IInputProductDTO = {
      name: 'Product 1',
      description: 'Product description',
      url_photo: 'https://productphoto.com',
      categoriesId: '0c112c2d-ce6f-453a-8cdb-682998a1a17e',
      price: 10.0,
    };

    it('should throw an error if the provided id is invalid', async () => {
      await expect(updateByIdProductUseCase.handle(productDTO, '')).rejects.toThrow('invalid id as it is not a uuid');
    });

    it('should throw an error if the product does not exist', async () => {
      (productRepositoryMock.getById  as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(updateByIdProductUseCase.handle(productDTO, id)).rejects.toThrow('Product dos not exist');
      expect(productRepositoryMock.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the product name is duplicated', async () => {
      const existingProduct = new Product(productDTO, '0c112c2d-ce6f-453a-8cdb-682998a1a17e');
      (productRepositoryMock.getById  as jest.Mock).mockResolvedValueOnce(existingProduct);
      (productRepositoryMock.getUniqueByName  as jest.Mock).mockResolvedValueOnce(existingProduct);
      await expect(updateByIdProductUseCase.handle(productDTO, id)).rejects.toThrow(
        'Product name is already being used by another Product',
      );
      expect(productRepositoryMock.getById).toHaveBeenCalledWith(id);
      expect(productRepositoryMock.getUniqueByName).toHaveBeenCalledWith(productDTO.name);
    });

    it('should update the product if all validation passes', async () => {
      const existingProduct = new Product(productDTO, id);
      (productRepositoryMock.getById  as jest.Mock).mockResolvedValueOnce(existingProduct);
      (productRepositoryMock.getUniqueByName  as jest.Mock).mockResolvedValueOnce(null);
      await updateByIdProductUseCase.handle(productDTO, id);
      expect(productRepositoryMock.getById).toHaveBeenCalledWith(id);
      expect(productRepositoryMock.getUniqueByName).toHaveBeenCalledWith(productDTO.name);
      expect(productRepositoryMock.updateById).toHaveBeenCalledWith(
        expect.objectContaining({
          name: existingProduct.name,
          description: existingProduct.description,
          categoriesId: existingProduct.categoriesId,
          url_photo: existingProduct.url_photo,
          price: existingProduct.price,
        })
      );
    });
  });
});
