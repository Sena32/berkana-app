'use client';

import React, { useState } from 'react';
import InputField from '../common/InputField';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Cursos', href: '/cursos' },
  { label: 'Como funciona', href: '/como-funciona' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Atendimento', href: '/atendimento' },
];

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Fecha o campo de busca ao clicar fora
  React.useEffect(() => {
    if (!searchOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [searchOpen]);

  // Foco automático ao abrir busca
  React.useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="w-full bg-white shadow-sm px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40" role="banner">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Página inicial Berkana Academy">
        <img src="/images/brand/berkana_logo.svg" alt="Berkana Academy" className="h-10 w-auto" />
      </a>
      {/* Agrupador do menu, busca e botões */}
      <div className="relative flex-1 flex items-center justify-end min-w-0">
        {/* Campo de busca animado, cobre toda a área exceto a logo */}
        <div
          ref={searchContainerRef}
          className={`absolute top-0 left-0 right-0 flex justify-center items-center z-50 ${searchOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ minHeight: 56 }}
        >
          <div
            className={`flex items-center bg-white rounded-lg shadow-theme-xs border border-gray-200 px-3 py-2 transition-all duration-300 w-full sm:w-[95vw] sm:max-w-xl
              ${searchOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'} ${searchOpen ? 'visible' : 'invisible'}`}
          >
            <div className="flex-1 w-full"> 
              <InputField
                ref={searchRef}
                type="text"
                placeholder="Buscar cursos..."
                className="flex-1 w-full border-0 shadow-none focus:ring-0 focus:border-0 bg-transparent text-base px-2 py-2"
              />
            </div>

            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Fechar busca"
              onClick={() => setSearchOpen(false)}
              tabIndex={searchOpen ? 0 : -1}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#23263B] font-medium hover:text-[#B5D334] transition-colors text-base px-2 py-1 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Busca e ações */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Lupa (abre campo de busca) */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F4FB] hover:bg-[#E3F2A7] transition-colors md:order-2"
            aria-label="Abrir busca"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#23263B]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
          {/* Botão Entrar */}
          <a
            href="/entrar"
            className="bg-white text-[#23263B] font-medium rounded-lg px-7 py-2 text-base shadow-theme-xs hover:text-[#B5D334] hover:bg-[#F1F4FB] transition-colors border border-gray-200 hidden md:inline-block"
          >
            Entrar
          </a>
          {/* Botão Cadastre-se */}
          <a
            href="/cadastro"
            className="bg-[#B5D334] text-[#16285E] font-bold rounded-lg px-7 py-2 text-base shadow-theme-xs hover:bg-[#A0BC2C] transition-colors hidden md:inline-block"
          >
            Cadastre-se
          </a>
          {/* Menu hamburguer mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Menu mobile */}
      {menuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 md:hidden animate-fade-in z-50" role="menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="w-full text-center py-2 text-[#23263B] font-medium hover:text-[#B5D334] transition-colors"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/entrar"
            className="w-full text-center py-2 bg-white text-[#23263B] font-medium rounded-lg mt-2 shadow-theme-xs hover:text-[#B5D334] hover:bg-[#F1F4FB] transition-colors border border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Entrar
          </a>
          <a
            href="/cadastro"
            className="w-full text-center py-2 bg-[#B5D334] text-[#16285E] font-bold rounded-lg mt-2 shadow-theme-xs hover:bg-[#A0BC2C] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Cadastre-se
          </a>
        </div>
      )}
    </header>
  );
};

export default PublicHeader; 