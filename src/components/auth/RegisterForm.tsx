'use client';

import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock de validação
    if (!email || !name || !password || !confirmPassword) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!email.includes('@')) {
      setError('E-mail inválido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!acceptTerms) {
      setError('Você deve aceitar os termos de uso.');
      return;
    }
    setError(null);
    // Aqui iria a chamada real de cadastro
    alert('Cadastro mockado com sucesso!');
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Criar uma conta</h1>
      <div className="text-sm text-text-secondary mb-2">
        Já tem um cadastro? <a href="/entrar" className="text-primary font-medium hover:underline">Entrar</a>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">E-mail institucional</span>
        <input
          type="email"
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="seu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Nome</span>
        <input
          type="text"
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Instituição ou empresa</span>
        <input
          type="text"
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Digite o nome da empresa onde trabalha"
          value={institution}
          onChange={e => setInstitution(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="text-sm font-medium text-text-primary">Senha</span>
        <input
          type={showPassword ? 'text' : 'password'}
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-primary"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.969 9.969 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.896-4.21 2.343-5.657" /></svg>
          )}
        </button>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Confirmar senha</span>
        <input
          type={showPassword ? 'text' : 'password'}
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={e => setAcceptTerms(e.target.checked)}
          className="accent-primary w-4 h-4"
        />
        <span className="text-xs text-text-secondary">Ao criar uma conta você estará de acordo com nossos <a href="/termos" className="text-primary hover:underline">Termos de Uso</a> e <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>.</span>
      </label>
      {error && <div className="text-error text-sm font-medium mt-2">{error}</div>}
      <button
        type="submit"
        className="mt-2 bg-primary text-white font-semibold rounded-lg px-6 py-3 text-base shadow-md hover:bg-primary/90 transition-colors"
      >
        Continuar
      </button>
    </form>
  );
};

export default RegisterForm; 