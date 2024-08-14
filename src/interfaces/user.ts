
// Address interface
export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

// User interface
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
}