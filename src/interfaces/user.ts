// User interface
export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  status: string;
}

export const defaultUser: IUser = {
  id: "",
  name: "",
  email: "",
  phoneNo: "",
  password: "",
  status: "active",
};

export interface IChangePassword {
  newPassword: string;
  confirmNewPassword: string;
}
export const defaultAdminChangePassword: IChangePassword = {
  newPassword: "",
  confirmNewPassword: "",
};
