import { IRole } from "@/interfaces/role";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type IRoleInitialState = {};

export interface IUpdateRoleArgs {
  id: string;
  updatedBody: Partial<IRole>;
}
