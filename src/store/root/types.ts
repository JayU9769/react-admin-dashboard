import type {UIMatch} from "@remix-run/router";


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
  statusCode: 0
}