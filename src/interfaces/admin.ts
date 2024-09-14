export interface ILogin {
  email: string;
  password: string;
}

export interface IAdmin {
  id: string;
  email: string;
  status: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminForm {
  id: string;
  email: string;
  status: number;
  password?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const defaultAdminForm: IAdminForm = {
  id: "",
  email: "",
  name: "",
  password: "",
  status: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultAdmin: IAdmin = {
  id: "",
  email: "",
  name: "",
  status: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};