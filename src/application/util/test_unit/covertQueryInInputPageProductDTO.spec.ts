import { covertQueryInInputPageProductDTO } from '../covertQueryInInputPageProductDTO';
import { IInputPageProductRequestDTO } from '../../DTO/input/IInputPageProductRequestDTO';

describe('covertQueryInInputPageProductDTO', () => {
  it('should convert query params to DTO with all fields undefined', () => {
    const query = {};

    const result = covertQueryInInputPageProductDTO(query);

    const expectedResult: IInputPageProductRequestDTO = {
      pageNumber: undefined,
      pageSize: undefined,
      sortDirection: undefined,
      orderBy: undefined,
    };

    expect(result).toEqual(expectedResult);
  });

  it('should convert query params to DTO with all fields defined', () => {
    const query = {
      pageNumber: '2',
      pageSize: '10',
      sortDirection: 'asc',
      orderBy: 'price',
    };

    const result = covertQueryInInputPageProductDTO(query);

    const expectedResult: IInputPageProductRequestDTO = {
      pageNumber: 2,
      pageSize: 10,
      sortDirection: 'asc',
      orderBy: 'price',
    };

    expect(result).toEqual(expectedResult);
  });

  it('should convert query params to DTO with some fields defined', () => {
    const query = {
      pageNumber: '1',
      pageSize: '20',
      orderBy: 'name',
    };

    const result = covertQueryInInputPageProductDTO(query);

    const expectedResult: IInputPageProductRequestDTO = {
      pageNumber: 1,
      pageSize: 20,
      sortDirection: undefined,
      orderBy: 'name',
    };

    expect(result).toEqual(expectedResult);
  });

  it('should convert query params to DTO with invalid types converted to undefined', () => {
    const query = {
      pageNumber: 'invalid',
      pageSize: {},
      sortDirection: 42,
      orderBy: [],
    };

    const result = covertQueryInInputPageProductDTO(query);

    const expectedResult: IInputPageProductRequestDTO = {
      pageNumber: NaN,
      pageSize: NaN,
      sortDirection: undefined,
      orderBy: undefined,
    };

    expect(result).toEqual(expectedResult);
  });
});
