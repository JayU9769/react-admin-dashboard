// User interface
export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  status: string;
}

export const defaultUser: IUser = {
  id: 0,
  name: "",
  email: "",
  password: "",
  status: "active",
};
