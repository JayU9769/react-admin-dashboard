import { IAdmin, IChangePassword, IProfileChangePassword, IProfileUpdate } from "@/interfaces/admin";

export type IAdminInitialState = {
  auth: IAdmin;
};

export interface IProfileUpdateProfilArgs {
  updatedBody: Partial<IProfileUpdate>;
}

export interface IProfileUpdatePasswordArgs {
  updatedBody: Partial<IProfileChangePassword>;
}

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
