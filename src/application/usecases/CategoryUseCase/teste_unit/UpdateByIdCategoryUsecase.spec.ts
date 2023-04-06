import { ICategoryRepository } from '../../../../domain/interfaces-repositories/ICategoryRepository';
import { IInputCategoryDTO } from '../../../DTO/input/IInputCategoryDTO';
import { Category } from '../../../../domain/entities/Category';
import { GetByIdCategoryUseCase } from '../GetByIdCategoryUseCase';
import { UpdateByIdCategoryUsecase } from '../UpdateByIdCategoryUsecase';

describe('UpdateByIdCategoryUsecase', () => {
  let updateByIdCategoryUsecase: UpdateByIdCategoryUsecase;
  let categoryRepository: ICategoryRepository;
  let getByIdCategoryUseCase: GetByIdCategoryUseCase;

  beforeEach(() => {
    categoryRepository = {
        create: jest.fn(),
        deleteById: jest.fn(),
        getAll: jest.fn(),
        getByName: jest.fn(),
        getById: jest.fn(),
        updateById: jest.fn(),
    };
    getByIdCategoryUseCase = {
      handle: jest.fn(),
    } as any;
    updateByIdCategoryUsecase = new UpdateByIdCategoryUsecase(categoryRepository, getByIdCategoryUseCase);
  });

  describe('handle', () => {
    it('should throw an error if the given id is invalid', async () => {
      const inputCategoryDTO: IInputCategoryDTO = {
        name: 'Category Name',
        url_photo: 'Category url_photo',
      };
      const id = '';

      await expect(updateByIdCategoryUsecase.handle(inputCategoryDTO, id)).rejects.toThrow('invalid id as it is not a uuid');
    });

    it('should throw an error if a category with the given name already exists', async () => {
      const inputCategoryDTO: IInputCategoryDTO = {
        name: 'Category Name',
        url_photo: 'Category url_photo',
      };
      const id = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';
      const existingCategory = new Category(inputCategoryDTO, '0c112c2d-ce6f-453a-8cdb-682998a1a17e');

      (getByIdCategoryUseCase.handle as jest.Mock).mockResolvedValueOnce(existingCategory);
      (categoryRepository.getByName as jest.Mock).mockResolvedValueOnce(existingCategory);

      await expect(updateByIdCategoryUsecase.handle(inputCategoryDTO, id)).rejects.toThrow('Category name is already being used by another category');
      expect(categoryRepository.getByName).toHaveBeenCalledWith(inputCategoryDTO.name);
      expect(getByIdCategoryUseCase.handle).toHaveBeenCalledWith(id);
    });

    it('should update the category if the name is not duplicated', async () => {
      const inputCategoryDTO: IInputCategoryDTO = {
        name: 'Category Name',
        url_photo: 'Category url_photo',
      };
      const id = '32917f7f-b2c6-4bb3-9f21-3078214d5ca3';
      const existingCategory = new Category(inputCategoryDTO, '0c112c2d-ce6f-453a-8cdb-682998a1a17e');

      (getByIdCategoryUseCase.handle as jest.Mock).mockResolvedValueOnce(existingCategory);
      (categoryRepository.getByName as jest.Mock).mockResolvedValueOnce(null);

      await updateByIdCategoryUsecase.handle(inputCategoryDTO, id);

      expect(categoryRepository.getByName).toHaveBeenCalledWith(inputCategoryDTO.name);
      expect(getByIdCategoryUseCase.handle).toHaveBeenCalledWith(id);
      expect(categoryRepository.updateById).toHaveBeenCalledWith(new Category(inputCategoryDTO, id));
    });
  });
});

