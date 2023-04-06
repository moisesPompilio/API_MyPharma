import { IInputPageProductRequestDTO } from "../../../DTO/input/IInputPageProductRequestDTO";
import { GetByIdCategoryUseCase } from '../../CategoryUseCase/GetByIdCategoryUseCase';
import { IProductRepository } from "../../../../domain/interfaces-repositories/IProductRepository";
import { PageProductRequest } from "../../../../domain/entities/PageProductRequest";
import { GetPageProductUsecase } from "../GetPageProductUsecase";

describe("GetPageProductUsecase", () => {
  let productRepository: IProductRepository;
  let getByIdCategoryUseCase: GetByIdCategoryUseCase;
  let getPageProductUseCase: GetPageProductUsecase;

  beforeEach(() => {
    productRepository = {
      getPage: jest.fn(),
      getPageByCategory: jest.fn(),
      getByName: jest.fn(),
    }as any;
    getByIdCategoryUseCase = {
      handle: jest.fn(),
    } as any; // como a tipagem do getByIdCategoryUseCase foi omitida no enunciado, vou deixar como any
    getPageProductUseCase = new GetPageProductUsecase(productRepository, getByIdCategoryUseCase);
  });

  it("should return products by category", async () => {
    const categoryId = "32917f7f-b2c6-4bb3-9f21-3078214d5ca3";
    const inputPageProduct: IInputPageProductRequestDTO = {
      pageNumber: 1,
      pageSize: 20,
      sortDirection: "asc",
      orderBy: "name",
    };
    const pageProductRequest = new PageProductRequest(inputPageProduct);
    const expectedProducts = [{ id: "1", name: "Product 1" }, { id: "2", name: "Product 2" }];
    const expectedCategory = { id: categoryId, name: "Category" };

    (getByIdCategoryUseCase.handle as jest.Mock).mockResolvedValueOnce(expectedCategory);
    (productRepository.getPageByCategory as jest.Mock).mockResolvedValueOnce(expectedProducts);

    const result = await getPageProductUseCase.handle(inputPageProduct, categoryId);

    expect(result).toEqual(expectedProducts);
    expect(getByIdCategoryUseCase.handle).toHaveBeenCalledWith(categoryId);
    expect(productRepository.getPageByCategory).toHaveBeenCalledWith(categoryId, pageProductRequest);
  });

  it("should return products by name", async () => {
    const searchByName = "Product";
    const inputPageProduct: IInputPageProductRequestDTO = {
      pageNumber: 1,
      pageSize: 20,
      sortDirection: "asc",
      orderBy: "name",
    };
    const pageProductRequest = new PageProductRequest(inputPageProduct);
    const expectedProducts = [{ id: "1", name: "Product 1" }, { id: "2", name: "Product 2" }];

    (productRepository.getByName as jest.Mock).mockResolvedValueOnce(expectedProducts);

    const result = await getPageProductUseCase.handle(inputPageProduct, undefined, searchByName);

    expect(result).toEqual(expectedProducts);
    expect(productRepository.getByName).toHaveBeenCalledWith(searchByName, pageProductRequest);
  });

  it('should get all products', async () => {
    const pageProductRequest = new PageProductRequest({
      pageNumber: 1,
      pageSize: 20,
      sortDirection: 'asc',
      orderBy: 'name',
    });

    await getPageProductUseCase.handle();

    expect(productRepository.getPage).toHaveBeenCalledWith(
      pageProductRequest,
    );
  });

  it('should get products by category id', async () => {
    const categoryId = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';
    const pageProductRequest = new PageProductRequest({
      pageNumber: 1,
      pageSize: 20,
      sortDirection: 'asc',
      orderBy: 'name',
    });
    (productRepository.getPageByCategory  as jest.Mock).mockResolvedValueOnce([]);

    await getPageProductUseCase.handle(undefined, categoryId);

    expect(getByIdCategoryUseCase.handle).toHaveBeenCalledWith(categoryId);
    expect(productRepository.getPageByCategory).toHaveBeenCalledWith(
      categoryId,
      pageProductRequest,
    );
  });

  it('should get products by name', async () => {
    const name = 'product-name';
    const pageProductRequest = new PageProductRequest({
      pageNumber: 1,
      pageSize: 20,
      sortDirection: 'asc',
      orderBy: 'name',
    });
    (productRepository.getByName  as jest.Mock).mockResolvedValueOnce([]);

    await getPageProductUseCase.handle(undefined, undefined, name);

    expect(productRepository.getByName).toHaveBeenCalledWith(
      name,
      pageProductRequest,
    );
  });
});
