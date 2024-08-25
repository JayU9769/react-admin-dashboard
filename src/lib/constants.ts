import {IListAPIResponse} from "@/interfaces";


export const authRoutes: string[] = [
  'login',
  'signup',
  'forgotPassword',
]


export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const defaultAPIResponse: IListAPIResponse  = {
  count: 0,
  rows: []
}