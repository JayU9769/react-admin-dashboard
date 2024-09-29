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

export interface ISearchArgs {
  type: string;
  keyword: string;
}

export interface ISearchItem {
  value: string;
  label: string;
}
export interface ISearchResponse {
  message: "";
  statusCode: number;
  data: Array<ISearchItem>;
}
