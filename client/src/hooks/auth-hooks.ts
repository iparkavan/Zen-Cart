import { signinMutationFn, signupMutationFn } from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useSignin = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signinMutationFn,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signupMutationFn,
  });
};
