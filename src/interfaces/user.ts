// User interface
export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  status: string;
}

export const defaultUser: IUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  status: "active",
};
