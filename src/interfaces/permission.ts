import {EUserType} from "@/interfaces/index.ts";
import {defaultRole, IRole} from "@/interfaces/role.ts";


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

export const defaultPermission: IPermission = {
  id: "",
  name: "",
  type: EUserType.USER,
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IRoleHasPermission {
  roleId: string;
  permissionId: string;
}


export const defaultGetPermissionResponse: IGetPermissionResponse = {
  permissions: [],
  roles: [],
  roleHasPermissions: []
}

export interface IUpdatePermissionRequest {
  value: number;
  role: IRole;
  permission: IPermission;
}

export const defaultUpdatePermissionRequest: IUpdatePermissionRequest = {
  value: 0,
  role: defaultRole,
  permission: defaultPermission
}