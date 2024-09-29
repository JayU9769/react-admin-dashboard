import type { UIMatch } from "@remix-run/router";

export type IRootInitialState = {
  isCollapsed: boolean;
  pageTitle: string;
  currentRoute: UIMatch;
  error: ICustomError;
};

export interface ICustomError {
  message: string;
  statusCode: number;
}

export const defaultCustomError: ICustomError = {
  message: "",
  statusCode: 0,
};
export interface ISearchItem {
  value: string;
  label: string;
}
export interface ISearchArgs {
  type: string;
  keyword: string;
}
export interface ISearchResponse {
  message: "";
  data: Array<ISearchItem>;
}

export interface ISearchValueArgs {
  type: string;
  value: string;
}
export interface ISearchValueResponse {
  message: "";
  data: ISearchItem;
}
