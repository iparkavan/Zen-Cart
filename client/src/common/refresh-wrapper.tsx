"use client";

import useCurrentUserInfo from "@/hooks/api/useAuth";
import { useUserStore } from "@/stores/user-info-slice";
import React, { useEffect } from "react";

const RefreshWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending: isUserPending } = useCurrentUserInfo();
  const { setUser } = useUserStore();

  // Update Zustand store when `data.user` changes
  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data?.user, setUser]);

  if (isUserPending) {
    return <p>Loading user...</p>; // you can replace with spinner/skeleton
  }

  return <>{children}</>;
};

export default RefreshWrapper;
