import {EUserType} from "@/interfaces/index.ts";

export interface IRole {
  id: string;
  name: string;
  type: EUserType;
  status: number;
  isSystem: number;
  createdAt: Date;
  updatedAt: Date;
}

export const defaultRole: IRole = {
  id: "",
  name: "",
  type: EUserType.USER,
  status: 1,
  isSystem: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
