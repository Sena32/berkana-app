import React from 'react';

const SuccessRequestCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-6 bg-white rounded-2xl shadow p-8">
      <div className="bg-success/10 rounded-full p-3">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-success"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h1 className="text-2xl font-bold text-text-primary text-center">Recebemos sua solicitação</h1>
      <p className="text-text-secondary text-center text-base max-w-xs">
        Sua solicitação de cadastro <span className="font-semibold">está em validação</span>. Em breve você terá acesso à sua área de aprendizagem. Avisaremos por e-mail.
      </p>
      <a
        href="/entrar"
        className="mt-4 bg-primary text-white font-semibold rounded-lg px-8 py-3 text-base shadow-md hover:bg-primary/90 transition-colors w-full text-center"
      >
        Continuar
      </a>
    </div>
  );
};

export default SuccessRequestCard; 