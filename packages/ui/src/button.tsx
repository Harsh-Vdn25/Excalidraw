"use client";

import { ReactNode } from "react";

interface ButtonProps {
  type?:'submit'|'button';
  variant?:'ghost'|'outline';
  size?:'sm'|'md'|'lg';
  children: ReactNode;
  className?:string;
  onClick?:()=>void
}
const ButtonVariants={
  ghost:'hover:bg-accent hover:text-accent-foreground',
  outline:'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
}
export const Button = ({type,variant,size,className,children,onClick}: ButtonProps) => {
  return (
    <button
     type={type}
      className={`${size} mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:ring-2 focus:ring-blue-500 ${variant&&ButtonVariants[variant]}
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};