import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createContextFactory = <TContextValue>(name?: string) => {
  const Context = React.createContext<TContextValue | null>(null);

  const useContext = () => {
    const context = React.useContext(Context);

    if (!context) {
      throw new Error(
        `use${name}Context는 ${name}ContextProvider 컴포넌트 안에서만 사용할 수 있습니다.`
      );
    }

    return context;
  };

  return [Context, useContext] as const;
};
