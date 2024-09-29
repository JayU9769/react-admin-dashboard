import { TableState as OriginalTableState } from "@tanstack/react-table"; // Adjust the import path as needed

export interface ITableState extends OriginalTableState {
  id: string;
}
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

export interface IUpdateAction {
  ids: string[]
  field: {
    name: string;
    value: number | string;
  }
}

export type TActionType = 'single' | 'bulk';

export enum EUserType {
  USER = 'user',
  ADMIN = 'admin'
}

export enum EAPITags {
  AUTH = 'Auth',
  ADMIN = 'Admin',
  USER = 'User',
  ROLE = 'Role',
  PERMISSION = 'Permission',
}

export type TIds = Array<string>;