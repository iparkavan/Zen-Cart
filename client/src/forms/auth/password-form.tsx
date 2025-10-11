"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignInRoute } from "@/lib/routes";
import { useSignin } from "@/hooks/auth-hooks";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user-info-store";
import { mergeGuestCartIntoBackend } from "@/hooks/cart-hook-logic/cart-logic-hooks";

// interface PasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
//   className?: string;
// }

export const PasswordForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = searchParams.get("redir") || "/";

  const { setUser } = useUserStore();

  const { mutate: signInMutate, isPending: isSignInPending } = useSignin();

  const email = searchParams.get("email") || "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signInMutate(
      { email, password },
      {
        onSuccess: async (data) => {
          if (data) {
            Cookies.set("token", data.access_token);

            setUser(data.user);
            await mergeGuestCartIntoBackend(data.user._id);

            router.push(redirectTo);
          }
        },
        onError: (error) => {
          setError("Your password is incorrect.");
          //   console.log(error.response.data.message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {/* Welcome back */}
            Sign in
          </CardTitle>
          <CardDescription>
            {email}{" "}
            <Link href={SignInRoute} className="text-blue-600 underline">
              Change
            </Link>
            {/* Login with your Apple or Google account */}
          </CardDescription>
        </CardHeader>

        <p className="text-sm text-center font-semibold text-red-600">
          {error && error}
        </p>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  //  disabled={isPending}
                >
                  {/* {isPending && <Loader className="animate-spin" />} */}
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Buying for work? &nbsp;
                <a
                  href="/business-register"
                  className="hover:underline text-[#0c3353] font-semibold"
                >
                  Create a free business account
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
