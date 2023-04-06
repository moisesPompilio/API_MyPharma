import { CreateProductUseCase } from "../CreateProductUseCase";
import { IProductRepository } from "../../../../domain/interfaces-repositories/IProductRepository";
import { IInputProductDTO } from "../../../DTO/input/IInputProductDTO";
import { Product } from "../../../../domain/entities/Product";
import { GetByIdCategoryUseCase } from "../../CategoryUseCase/GetByIdCategoryUseCase";

describe("CreateProductUseCase", () => {
  const productRepositoryMock: jest.Mocked<IProductRepository> = {
    create: jest.fn(),
    getUniqueByName: jest.fn(),
  } as any;

  const getByIdCategoryUseCaseMock: jest.Mocked<GetByIdCategoryUseCase> = {
    handle: jest.fn(),
  } as any;

  const createProductUseCase = new CreateProductUseCase(
    productRepositoryMock,
    getByIdCategoryUseCaseMock
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create a product when it does not exist yet", async () => {
    // Arrange
    const inputProductDTO: IInputProductDTO = {
      name: "Product Test",
      description: "Product Test Description",
      categoriesId: "32917f7f-b2c6-4bb3-9f21-3078214d5ca3",
      url_photo: "url_photo",
      price: 10,
    };

    const product = new Product(inputProductDTO);
    productRepositoryMock.getUniqueByName.mockResolvedValueOnce(null);

    // Act
    await createProductUseCase.handle(inputProductDTO);

    expect(productRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: inputProductDTO.name,
        description: inputProductDTO.description,
        categoriesId: inputProductDTO.categoriesId,
        url_photo: inputProductDTO.url_photo,
        price: inputProductDTO.price,
      })
    );
    
  });

  it("should throw an error when trying to create a product that already exists", async () => {
    // Arrange
    const inputProductDTO: IInputProductDTO = {
      name: "Product Test",
      description: "Product Test Description",
      categoriesId: "32917f7f-b2c6-4bb3-9f21-3078214d5ca3",
      url_photo: "url_photo",
      price: 10,
    };

    const existingProduct = new Product(inputProductDTO);
    productRepositoryMock.getUniqueByName.mockResolvedValueOnce(
      existingProduct
    );

    // Act & Assert
    await expect(
      createProductUseCase.handle(inputProductDTO)
    ).rejects.toThrowError("Product name already exists");

    expect(productRepositoryMock.getUniqueByName).toHaveBeenCalledWith(
      inputProductDTO.name
    );
    expect(productRepositoryMock.create).not.toHaveBeenCalled();
    expect(getByIdCategoryUseCaseMock.handle).toHaveBeenCalledWith(
      inputProductDTO.categoriesId
    );
  });
});
