'use client';

import React from 'react';

import { ThemeProvider } from 'next-themes';

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
