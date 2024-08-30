import type {UIMatch} from "@remix-run/router";


export type IRootInitialState = {
  isCollapsed: boolean;
  pageTitle: string;
  currentRoute: UIMatch
};