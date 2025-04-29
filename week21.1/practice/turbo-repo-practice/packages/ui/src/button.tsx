"use client";

import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, className, appName, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
