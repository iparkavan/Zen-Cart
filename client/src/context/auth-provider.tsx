"use client";

import useAuth from "@/hooks/api/useAuth";
import React, { createContext, useContext } from "react";

type IAuthContext = {};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isPending: isUserPending } = useAuth();

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  );
};

// export const useAuthContext = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
// };

export const useAuthContext = () => useContext(AuthContext);
