'use client';

import React, { useRef, useState } from 'react';

const CODE_LENGTH = 4;

const VerificationCodeForm: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    setError(null);
    if (value && idx < CODE_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((c) => !c)) {
      setError('Preencha todos os dígitos do código.');
      return;
    }
    setError(null);
    // Aqui iria a validação real do código
    alert('Código verificado com sucesso (mock)!');
  };

  return (
    <form className="w-full flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-success/10 rounded-full p-2 mb-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-success"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth="2" /><path d="M8 11h8M8 15h4" strokeWidth="2" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Código de verificação</h1>
        <p className="text-text-secondary text-center text-base max-w-xs">Digite o código que enviamos para o seu e-mail <span className="font-semibold text-text-primary">jo...@mj.gov.br</span>. Pode levar alguns minutos para que o código chegue na sua caixa de entrada.</p>
      </div>
      <div className="flex gap-3 justify-center">
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={el => { inputsRef.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            value={digit}
            onChange={e => handleChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(idx, e)}
            autoFocus={idx === 0}
            aria-label={`Dígito ${idx + 1}`}
          />
        ))}
      </div>
      {error && <div className="text-error text-sm font-medium mt-2">{error}</div>}
      <div className="flex flex-col sm:flex-row gap-2 w-full justify-between items-center mt-2">
        <button type="button" className="text-primary text-sm hover:underline" onClick={() => alert('Código reenviado (mock)!')}>O código não chegou</button>
        <a href="/entrar" className="text-text-secondary text-sm hover:underline">Voltar</a>
      </div>
      <button
        type="submit"
        className="mt-2 bg-primary text-white font-semibold rounded-lg px-6 py-3 text-base shadow-md hover:bg-primary/90 transition-colors w-full"
      >
        Verificar código
      </button>
      <a href="#" className="text-primary text-xs mt-2 hover:underline">Estou tendo problemas para entrar</a>
    </form>
  );
};

export default VerificationCodeForm; 