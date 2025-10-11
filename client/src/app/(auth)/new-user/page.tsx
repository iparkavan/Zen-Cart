"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { SignInRoute } from "@/lib/routes";
import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const searchParams = useSearchParams();
  //   const router = useRouter();
  const email = searchParams.get("email") || "";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        {/* <SignInOrCreateAccountForm /> */}
        <div className={cn("flex flex-col gap-6 text-left")}>
          <Card>
            <CardHeader className="">
              <CardTitle className="text-2xl">
                {/* Welcome back */}
                Looks like you are new to Amazon
              </CardTitle>
              <CardDescription>
                {email}{" "}
                <Link href={SignInRoute} className="text-blue-600 underline">
                  Change
                </Link>
                {/* Login with your Apple or Google account */}
              </CardDescription>
              <p className="text-md font-semibold ">
                Let's create an account using your email address
              </p>
            </CardHeader>

            <CardContent>
              <Button
                type="submit"
                className="w-full"
                // disabled={isEmailExistPending}
              >
                Proceed to create an account
              </Button>
              <div className="text-center text-sm mt-4">
                Already a customer? &nbsp;
                <a
                  href="/business-register"
                  className="hover:underline text-[#0c3353] font-semibold"
                >
                  Sign in with another email{" "}
                </a>
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
