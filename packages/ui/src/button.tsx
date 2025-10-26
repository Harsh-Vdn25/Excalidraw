"use client";

import { ReactNode } from "react";

interface ButtonProps {
  type:string;
  children: ReactNode;
  onClick:()=>void
}

export const Button = ({type,children,onClick }: ButtonProps) => {
  return (
    <button
      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
