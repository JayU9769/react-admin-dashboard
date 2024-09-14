export interface IRole {
  id: string;
  name: string;
  type: string;
  status: number;
}

export const defaultRole = {
  id: "",
  name: "",
  type: "",
  status: 1,
};
