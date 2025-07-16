import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-background border-t border-border pt-10 pb-6 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Coluna institucional */}
        <div className="flex-1 min-w-[220px] mb-6 md:mb-0">
          <img src="/images/brand/berkana_logo.svg" alt="Berkana Academy" className="h-10 mb-4" />
          <p className="text-sm text-text-secondary mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget iaculis nunc.</p>
          <p className="text-xs text-text-secondary">Rua Machado Bittencourt, 190 – CJ 682<br />Vila Clementino, São Paulo - SP, 04044-000</p>
          <p className="text-xs text-text-secondary mt-2">Telefone: (11) 5539-5166<br />academy@berkana.com.br</p>
        </div>
        {/* Colunas de links */}
        <div className="flex-1 flex flex-wrap gap-8">
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Comunidade</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li><a href="/cursos" className="hover:text-primary">Cursos</a></li>
              <li><a href="/instrutores" className="hover:text-primary">Instrutores</a></li>
              <li><a href="/eventos" className="hover:text-primary">Eventos e Webinários</a></li>
              <li><a href="/categorias" className="hover:text-primary">Categorias de cursos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Berkana Academy</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li><a href="/sobre" className="hover:text-primary">Sobre</a></li>
              <li><a href="/atendimento" className="hover:text-primary">Atendimento</a></li>
              <li><a href="/eventos" className="hover:text-primary">Eventos</a></li>
              <li><a href="/instagram" className="hover:text-primary">Instagram</a></li>
              <li><a href="/linkedin" className="hover:text-primary">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Links úteis</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li><a href="/" className="hover:text-primary">Site Berkana</a></li>
              <li><a href="/termos" className="hover:text-primary">Termos de uso do site</a></li>
              <li><a href="/privacidade" className="hover:text-primary">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-xs text-text-secondary text-center">
        &copy; {new Date().getFullYear()} Berkana Academy. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer; 