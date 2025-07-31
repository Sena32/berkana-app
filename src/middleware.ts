import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserProfile } from "@/types/user";

export default withAuth(
  function middleware(req) {
    console.log('Middleware acionado');
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/entrar");
    const isErrorPage = req.nextUrl.pathname.startsWith("/error");
    const isPublicPage = req.nextUrl.pathname.startsWith("/public");
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");
    const isAlunoRoute = req.nextUrl.pathname.startsWith("/aluno");
    const isStaticFile = req.nextUrl.pathname.match(/\.(png|svg|jpg|jpeg|gif|ico|css|js|woff|woff2|ttf|eot)$/);
    const isNextStatic = req.nextUrl.pathname.startsWith("/_next/");

    // Permitir acesso a arquivos estáticos e rotas do Next.js
    if (isStaticFile || isNextStatic) {
      return NextResponse.next();
    }

    // Se estiver na página de login e já estiver autenticado
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/aluno", req.nextUrl));
    }

    // Se não estiver autenticado e tentar acessar área do aluno
    if (!isAuth && isAlunoRoute) {
      const from = req.nextUrl.pathname;
      return NextResponse.redirect(
        new URL(`/entrar?from=${encodeURIComponent(from)}`, req.nextUrl)
      );
    }

    // Para rotas da API, injetar o token automaticamente se autenticado
    if (isApiRoute && isAuth && token?.accessToken) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('Authorization', `Bearer ${token.accessToken}`);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Permitir acesso a todas as outras rotas (não /aluno)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAlunoRoute = req.nextUrl.pathname.startsWith("/aluno");
        const isStaticFile = req.nextUrl.pathname.match(/\.(png|svg|jpg|jpeg|gif|ico|css|js|woff|woff2|ttf|eot)$/);
        const isNextStatic = req.nextUrl.pathname.startsWith("/_next/");

        // Permitir acesso a arquivos estáticos e rotas do Next.js
        if (isStaticFile || isNextStatic) {
          return true;
        }

        // Se não há token, permitir acesso a rotas que não sejam /aluno
        if (!token) {
          return !isAlunoRoute;
        }

        // Se há token, verificar se não é aluno para rotas /aluno
        if (isAlunoRoute) {
          if (
            token.user &&
            typeof token.user === "object" &&
            "profile" in token.user
          ) {
            return true; // Permitir acesso para outros perfis
          }
          return false; // Bloquear acesso para alunos
        }

        // Permitir acesso a todas as outras rotas
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - static files (_next/static/*, _next/image/*, favicon.ico, etc.)
     * - public pages (/public/*)
     * - error pages (/auth/error)
     * - auth pages (/entrar)
     * - images and other static assets
     */
    '/((?!_next/static|_next/image|public|/error|/entrar|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$|.*\\.css$|.*\\.js$|.*\\.woff$|.*\\.woff2$|.*\\.ttf$|.*\\.eot$).*)'
  ],
}; 