import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    return await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  };

  const logout = async () => {
    return await signOut({ redirect: true });
  };

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    login,
    logout,
    accessToken: session?.accessToken,
  };
} 