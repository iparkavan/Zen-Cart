"use client";

import React, { FormEvent, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerSignUp } from "@/hooks/auth-hooks";
import { date } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/user-info-store";
import { signupSchema, SignupSchemaType } from "@/schema/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { mergeGuestCartIntoBackend } from "@/hooks/cart-hook-logic/cart-logic-hooks";
import { SignInRoute } from "@/lib/routes";
import { Loader } from "lucide-react";

const CustomerSignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redir") || "/";

  const { setUser } = useUserStore();
  // const [formData, setFormData] = useState<SignupSchemaType>({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: customerSignUpMutate, isPending: isCustomerSignUpPending } =
    useCustomerSignUp();

  const onSubmit = (formData: SignupSchemaType) => {
    if (isCustomerSignUpPending) return;

    customerSignUpMutate(formData, {
      onSuccess: async (data) => {
        if (data) {
          Cookies.set("token", data.access_token);

          setUser(data.user);
          await mergeGuestCartIntoBackend(data.user._id);

          router.push(redirectTo);
        }
      },
    });
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6 text-left")}>
        <Card>
          <CardHeader className="">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent>
            {/* <SignUpForm /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div> */}
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="name"
                      // name="name"
                      {...register("name")}
                      // placeholder="m@example.com"
                      //   onChange={handleSignUpChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      // name="email"
                      {...register("email")}
                      placeholder="m@example.com"
                      //   onChange={handleSignUpChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      // name="password"
                      {...register("password")}
                      //   onChange={handleSignUpChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    {isCustomerSignUpPending && (
                      <Loader className="animate-spin" />
                    )}
                    {isCustomerSignUpPending ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already a customer? &nbsp;
                  <a
                    href={SignInRoute}
                    className="hover:underline text-[#0c3353] font-semibold"
                  >
                    Sign in instead
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
};

export default CustomerSignUpForm;
