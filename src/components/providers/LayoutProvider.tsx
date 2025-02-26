"use client";

import { setAccessToken } from "@/lib/apis";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { data } = useSession();

  useEffect(() => {
    if (data?.accessToken) {
      setAccessToken(data.accessToken);
    }
  }, [data]);

  return <>{children}</>;
};
