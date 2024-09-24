import {EUserType} from "@/interfaces/index.ts";
import {IRole} from "@/interfaces/role.ts";


export interface IGetPermissionResponse {
  permissions: IPermission[];
  roles: IRole[];
  roleHasPermissions: IRoleHasPermission[]
}

export interface IPermission {
  id: string;
  name: string;
  type: EUserType;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleHasPermission {
  roleId: string;
  permissionId: string;
}


export const defaultGetPermissionResponse: IGetPermissionResponse = {
  permissions: [],
  roles: [],
  roleHasPermissions: []
}