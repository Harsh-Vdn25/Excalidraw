"use client";

import { createContext, useState, ReactNode, SetStateAction } from "react";

interface AuthType {
  Token: string;
  setToken: React.Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [Token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ Token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
