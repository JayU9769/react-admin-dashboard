import { IAdmin, IChangePassword } from "@/interfaces/admin";

export type IAdminInitialState = {
  auth: IAdmin;
};

export interface IUpdateAdminArgs {
  id: string;
  updatedBody: Partial<IAdmin>;
}

export interface IUpdatePasswordArgs {
  id: string;
  updatedBody: Partial<IChangePassword>;
}

export interface IDeleteAdminArgs {
  ids: string[];
}
