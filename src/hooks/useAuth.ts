'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Se a sessão tem erro, força logout
    if ((session as any)?.error) {
      console.log('Erro de sessão detectado, forçando logout:', (session as any).error);
      
      // Força logout
      signOut({ 
        redirect: true,
        callbackUrl: '/entrar'
      });
      
      return;
    }

    // Se a sessão expirou (expires no passado)
    if (session?.expires && new Date(session.expires) < new Date()) {
      console.log('Sessão expirada, forçando logout');
      
      signOut({ 
        redirect: true,
        callbackUrl: '/entrar'
      });
      
      return;
    }

    // Se não há usuário mas status é autenticado, força logout
    if (status === 'authenticated' && !session?.user) {
      console.log('Sessão sem usuário, forçando logout');
      
      signOut({ 
        redirect: true,
        callbackUrl: '/entrar'
      });
      
      return;
    }
  }, [session, status, router]);

  const login = async (email: string, password: string) => {
    console.log('Tentando login com:', { email, password: '***' });
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      console.log('Resultado do login:', result);
      return result;
    } catch (error) {
      console.error('Erro na função login:', error);
      throw error;
    }
  };

  const logout = async () => {
    return await signOut({ redirect: true });
  };

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated' && !!session?.user,
    isLoading: status === 'loading',
    login,
    logout,
    user: session?.user,
    accessToken: (session as any)?.accessToken
  };
} 