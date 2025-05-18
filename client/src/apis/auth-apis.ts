import axiosInstance from "@/lib/axios-client";
import {
  GetCurrentUserResponseType,
  ISignInType,
  ISignUpType,
  LoginResponseType,
} from "@/types/auth-types";

export const signinMutationFn = async (
  data: ISignInType
): Promise<LoginResponseType> => {
  const res = await axiosInstance.post(`/auth/login`, data);
  return res.data;
};

export const signupMutationFn = async (data: ISignUpType) => {
  const res = await axiosInstance.post(`/auth/seller-registration`, data);
  return res.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<GetCurrentUserResponseType> => {
    const res = await axiosInstance.get(`/user/current-user`);
    return res.data;
  };
