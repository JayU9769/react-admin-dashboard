export interface ILogin {
  email: string;
  password: string;
}

export interface IAdmin {
  id: string;
  email: string;
  status: number;
  name: string;
  roles: Array<string>;
  permissions: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminForm {
  id: string;
  email: string;
  status: number;
  password?: string;
  name: string;
  roles: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export const defaultAdminForm: IAdminForm = {
  id: "",
  email: "",
  name: "",
  password: "",
  status: 1,
  roles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultAdmin: IAdmin = {
  id: "",
  email: "",
  name: "",
  status: 1,
  roles: [],
  permissions: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IProfileUpdate {
  name: string;
  email: string;
}
export interface IChangePassword {
  newPassword: string;
  confirmNewPassword: string;
}
export const defaultAdminChangePassword: IChangePassword = {
  newPassword: "",
  confirmNewPassword: "",
};

export interface IProfileChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const defaultProfileChangePassword = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
