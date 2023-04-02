import { IInputPageProductRequestDTO } from '../DTO/input/IInputPageProductRequestDTO';


export function CovertQueryInInputPageProductDTO(query: any): IInputPageProductRequestDTO{
    return {
        pageNumber: query.pageNumber === undefined ? undefined : Number(query.pageNumber),
        pageSize: query.pageSize === undefined ? undefined : Number(query.pageSize),
        sortDirection: typeof query.sortDirection === "string" ? query.sortDirection : undefined,
        orderBy: typeof query.orderBy === "string" ? query.orderBy : undefined,
    }
}