import { PaginationRequest } from "./paginationRequest";

export interface ProductSearch  extends PaginationRequest{
    searchKey: string;
    categoryId?: string;
    sortBy?: string;
    maxPrice?: number;
    minPrice?: number;
    choicesId?:string[] | null;
}