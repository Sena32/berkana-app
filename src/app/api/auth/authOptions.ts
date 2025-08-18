import { AuthService } from "@/services/auth.service";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { parse as parseSingle } from 'cookie';
import { UserProfile } from "@/types/user";

export function parseSetCookieHeader(setCookieHeader: string): Record<string, string> {
  const rawCookies = setCookieHeader.split(/,(?=\s*\w+=)/);
  const result: Record<string, string> = {};
  for (const cookieStr of rawCookies) {
    const parsed = parseSingle(cookieStr);
    Object.assign(result, parsed);
  }
  return result;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        const { data, headers } = await AuthService.signin(
          { email: credentials?.email || '', password: credentials?.password || '' },
          { credentials: 'include' }
        );

        // Extrai o refresh_token do set-cookie
        const rawSetCookie = headers.get('set-cookie');
        let refreshToken: string | undefined = undefined;
        if (rawSetCookie) {
          const parsed = parseSetCookieHeader(rawSetCookie);
          refreshToken = parsed.refresh_token;
        }

        return {
          ...data.user,
          accessToken: data.access_token,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log('JWT Token: ', token);
      console.log('JWT Trigger: ', trigger);
      console.log('JWT Session: ', session);
      
      // Quando um usuário faz login pela primeira vez
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          profile: user.profile,
          institution: user.institution,
          isActive: user.isActive
        };
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutos
        return token;
      }

      // Quando a sessão é atualizada via update()
      if (trigger === "update" && session?.user) {
        console.log('Atualizando JWT com novos dados:', session.user);
        token.user = {
          ...(token.user ?? {}),
          ...(session.user ?? {})
        };
        return token;
      }

      // Validação: se o token ainda é válido, retorna como está
      if (token.accessToken && token.accessTokenExpires && Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      // Se expirou, faça o refresh usando o refreshToken salvo no JWT
      try {       
        if (!token.refreshToken) throw new Error('No refresh token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            Cookie: `refresh_token=${token.refreshToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Refresh Token Response: ', res);

        const setCookie = res.headers.get('set-cookie');
        if (!res.ok || !setCookie) {
          delete token.accessToken;
          delete token.refreshToken;
          delete token.accessTokenExpires;
          token.error = "RefreshAccessTokenError";
          return token;
        }

        const parsed = parseSetCookieHeader(setCookie);

        token.accessToken = (await res.json()).access_token;
        token.refreshToken = parsed.refresh_token;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
        return token;
      } catch (error) {
        console.log('Refresh Token Error: ', error);
        token.error = "RefreshAccessTokenError";
        delete token.accessToken;
        delete token.refreshToken;
        delete token.accessTokenExpires;
        return token;
      }
    },
    
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/entrar",
    error: "/auth/erro",
  },

  events: {
    async signIn(message) {},
    async signOut({ token }) {
      try {
        await AuthService.logout({
          credentials: 'include',
          Authorization: token?.accessToken ? `Bearer ${token.accessToken}` : ''
        });
      } catch (error) {
        throw error;
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',
};

export default authOptions; 