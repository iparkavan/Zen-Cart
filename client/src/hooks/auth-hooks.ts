import {
  checkEmailExistMutationFn,
  signinMutationFn,
  signupCustomerMutationFn,
  signupSellerMutationFn,
} from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useSignin = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signinMutationFn,
  });
};

export const useSellerSignUp = () => {
  return useMutation({
    mutationKey: ["seller-sign-up"],
    mutationFn: signupSellerMutationFn,
  });
};

export const useCustomerSignUp = () => {
  return useMutation({
    mutationKey: ["customer-sign-up"],
    mutationFn: signupCustomerMutationFn,
  });
};

export const useIsEmailExist = () => {
  return useMutation({
    mutationKey: ["is-email-exist"],
    mutationFn: checkEmailExistMutationFn,
  });
};
