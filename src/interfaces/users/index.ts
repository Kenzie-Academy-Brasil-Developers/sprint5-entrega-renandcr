export interface IUserStore {
  name: string;
  email: string;
  password: string;
  age: number;
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  id: string;
  updated_at: Date;
  created_at: Date;
}

export interface IUserUpdate {
  name: string;
  email: string;
  age: number;
  id: string;
}
