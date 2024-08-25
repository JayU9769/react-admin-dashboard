export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}


export interface IPaginationState {
  pageIndex: number;
  pageSize: number;
}

export type TRecord = Record<string, any>;

export interface IListAPIResponse {
  count: number;
  rows: TRecord[]
}