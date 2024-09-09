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

export const defaultAdmin: IAdmin = {
  id: "",
  email: "",
  name: "",
  status: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
