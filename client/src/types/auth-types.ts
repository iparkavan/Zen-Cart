import { RoleEnum } from "@/enum/role-enum";

export interface ISignInType {
  email: string;
  password: string;
}

export interface Role {
  _id: string;
  name: RoleEnum;
  permissions: string[]; // You can also create a Permissions enum if needed
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  role: Role;
  address: any[]; // Replace with `Address[]` if you have a defined structure
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginResponseType {
  message: string;
  user: User;
  access_token: string;
}

export interface ISignUpType {
  email: string;
  password: string;
}

export interface Role {
  _id: string;
  name: RoleEnum;
  permissions: string[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string | null;
  role: Role;
  address: any[]; // You can replace `any` with a proper address type if defined
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetCurrentUserResponseType {
  message: string;
  user: User;
}
