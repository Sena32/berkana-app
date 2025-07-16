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
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/60 to-[#2563eb]/40 z-0" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-6 py-12 md:py-0 md:px-12 max-w-md">
          <img src="/images/brand/berkana_logo.svg" alt="Logo Berkana" className="h-12 mb-4" />
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-left mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Melhore suas habilidades com Berkana Academy!
          </h2>
          <p className="text-white/80 text-left text-base md:text-lg max-w-md font-normal">
            O conhecimento certo abre portas. Aqui, você encontra os cursos que vão impulsionar sua carreira e transformar seu futuro. Pronto para começar?
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