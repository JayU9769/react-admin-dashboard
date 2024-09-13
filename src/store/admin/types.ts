import { IAdmin } from "@/interfaces/admin";

export type IAdminInitialState = {
  auth: IAdmin;
};

export interface IUpdateAdminArgs {
  id: string;
  updatedBody: Partial<IAdmin>;
}

export interface IDeleteAdminArgs {
  ids: string[];
}
