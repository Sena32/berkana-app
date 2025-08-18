import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc?: string; // nova prop
  imageAlt?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageSrc = '/images/auth-bg.png', // valor padrão
  imageAlt = 'Berkana Academy',
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo: Logo, textos, fundo com overlay sutil */}
      <div
        className="relative md:w-1/2 w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {/* Overlay degradê sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/100 to-[#000000]/20 z-0" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-6 py-12 md:py-0 md:px-12 max-w-md">
          <Link href="/">
            <Image 
              src="/images/brand/logo-berkana-vertical.svg" 
              alt="Logo Berkana"
              unoptimized={true}
              width={75}
              height={125}
              className="mb-4"
              priority={false}
            />
          </Link>
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-left mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Melhore suas habilidades com a Berkana Academy!
          </h2>
          <p className="text-white/80 text-left text-base md:text-lg max-w-md font-normal">
            Aprenda com cursos pensados para servidores e colaboradores de instituições públicas e privadas. Ganhe certificações, avance na carreira e conquiste novas oportunidades — tudo no seu ritmo. Cadastre-se e comece hoje mesmo!
          </p>
        </div>
      </div>
      {/* Lado direito: Formulário */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout; 