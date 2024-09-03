
export interface IPaginationState {
  pageIndex: number;
  pageSize: number;
}

export type TRecord = Record<string, any>;

export interface IPaginationResponse {
  data: IListAPIResponse;
  message: string;
}

export interface IListAPIResponse {
  count: number;
  rows: TRecord[]
}


export type TActionType = 'single' | 'bulk';

export type TIds = Array<string | number>;