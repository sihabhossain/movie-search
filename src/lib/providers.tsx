"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "@/contexts/DarkModeContext";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </QueryClientProvider>
  );
};
