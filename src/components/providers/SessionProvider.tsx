'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { AuthMonitor } from './AuthMonitor';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <AuthMonitor />
      {children}
    </NextAuthSessionProvider>
  );
} 