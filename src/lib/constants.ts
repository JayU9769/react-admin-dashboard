import {IListAPIResponse, IPaginationState} from "@/interfaces";


export const API_BASE_URL: string = import.meta.env.VITE_API_URL;


export const authRoutes: string[] = [
  'login',
  'signup',
  'forgotPassword',
]


export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 20;


export const defaultPagination: IPaginationState = {
  pageIndex: DEFAULT_PAGE_INDEX, //initial page index
  pageSize: DEFAULT_PAGE_SIZE, //default page size
}

export const defaultAPIResponse: IListAPIResponse  = {
  count: 0,
  rows: []
}