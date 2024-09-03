import {IUser} from "@/interfaces/user.ts";

export type IUserInitialState = {
};


export interface IUpdateUserArgs {
  id: string;
  updatedUser: Partial<IUser>;
}

export interface IDeleteUserArgs {
  ids: string[];
}