import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignInRoute } from "@/lib/routes";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user-info-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserProfilePopoverProps {
  isProfilePopoverOpen: boolean;
  setIsProfilePopoverOpen: (open: boolean) => void;
}

// const userLists = [

// ]

const userAccount = [
  { name: "Your Account", href: "/" },
  { name: "Your Orders", href: "/" },
  { name: "Your Wish List", href: "/" },
];

export const UserProfilePopover: React.FC<UserProfilePopoverProps> = ({
  isProfilePopoverOpen,
  setIsProfilePopoverOpen,
}) => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { clearUser, user } = useUserStore();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProfilePopoverOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsProfilePopoverOpen(false), 150);
  };

  // const handleOptionSelect = () => {
  //   setIsProfilePopoverOpen(false);
  // };

  const logoutHandler = () => {
    clearUser();
    Cookies.remove("token");
    router.push(SignInRoute);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Popover
        open={isProfilePopoverOpen}
        onOpenChange={setIsProfilePopoverOpen}
      >
        <PopoverTrigger asChild>
          <div
            // href="/account"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            className="text-sm hover:border hover:rounded-2xl p-2 hover:text-amazon-orange flex items-center"
          >
            <User size={18} className="mr-1" />
            <div>
              <div className="text-xs">
                Hello, {user?._id ? user.email : "Sign in"}
              </div>
              <div className="font-bold">Account & Lists</div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 backdrop-blur-md bg-white/30">
          <div>
            {!user?._id && (
              <>
                <div className="text-center">
                  <Button onClick={() => router.push(SignInRoute)}>
                    Sign In
                  </Button>
                </div>
                <p className="flex gap-2 text-center mt-2">
                  New Costomer?{" "}
                  <Link
                    href={"/create-account"}
                    className="underline text-green-700"
                  >
                    Starts here
                  </Link>
                </p>
                <div className="border-b mt-4 border-black" />
              </>
            )}
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-xl font-bold">Your Account</h1>
                {user?._id && (
                  <div>
                    <p className="hover:underline hover:text-amber-600 cursor-pointer transition-all duration-300">
                      Switch Account
                    </p>
                    <p
                      className="hover:underline hover:text-amber-600 cursor-pointer transition-all duration-300"
                      onClick={logoutHandler}
                    >
                      Sign out
                    </p>
                    <div className="border-b my-2 border-black" />
                  </div>
                )}
                <div className="flex flex-col">
                  {userAccount?.map((item) => (
                    <span
                      key={item.name}
                      onClick={() => {
                        router.push(item.href);
                        setIsProfilePopoverOpen(false);
                      }}
                      className="hover:underline hover:text-amber-600 cursor-pointer transition-all duration-300"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
