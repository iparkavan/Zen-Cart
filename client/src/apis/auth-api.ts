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

export const signupSellerMutationFn = async (data: ISignUpType) => {
  const res = await axiosInstance.post(`/auth/seller-registration`, data);
  return res.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<GetCurrentUserResponseType> => {
    const res = await axiosInstance.get(`/user/current-user`);
    return res.data;
  };

export const checkEmailExistMutationFn = async (data: {
  email: string;
}): Promise<{
  message: string;
  exist: boolean;
  userEmail: string;
}> => {
  const res = await axiosInstance.post(`/auth/verify-email`, data);
  return res.data;
};

export const signupCustomerMutationFn = async (data: ISignUpType) => {
  const res = await axiosInstance.post(`/auth/customer-registration`, data);
  return res.data;
};
