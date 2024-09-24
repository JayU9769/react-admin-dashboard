import { IUser } from "@/interfaces/user.ts";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type IUserInitialState = {};

export interface IUpdateUserArgs {
  id: string;
  updatedUser: Partial<IUser>;
}
