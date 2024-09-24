import { IChangePassword, IUser } from "@/interfaces/user.ts";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type IUserInitialState = {};

export interface IUpdateUserArgs {
  id: string;
  updatedUser: Partial<IUser>;
}

export interface IUpdatePasswordArgs {
  id: string;
  updatedBody: Partial<IChangePassword>;
}
