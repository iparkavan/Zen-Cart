import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignInRoute } from "@/lib/routes";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user-info-store";

interface UserProfilePopoverProps {
  isProfilePopoverOpen: boolean;
  setIsProfilePopoverOpen: (open: boolean) => void;
}

export const UserProfilePopover: React.FC<UserProfilePopoverProps> = ({
  isProfilePopoverOpen,
  setIsProfilePopoverOpen,
}) => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const logoutHandler = () => {
    clearUser();
    Cookies.remove("token");
    router.push(SignInRoute);
  };

  return (
    <Popover open={isProfilePopoverOpen} onOpenChange={setIsProfilePopoverOpen}>
      <PopoverTrigger asChild>
        <div
          // href="/account"
          className="text-sm hover:border hover:rounded-2xl p-2 hover:text-amazon-orange flex items-center"
        >
          <User size={18} className="mr-1" />
          <div>
            <div className="text-xs">Hello, Sign in</div>
            <div className="font-bold">Account</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 backdrop-blur-md bg-white/30">
        <div>
          <div>
            <h1 className="text-xl font-bold">Your Account</h1>
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
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
