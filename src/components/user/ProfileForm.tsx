'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AvatarUploader from './AvatarUploader';
import { profileSchema, passwordSchema, ProfileFormValues, PasswordFormValues } from '@/validations/profile-schema';

const defaultProfile: ProfileFormValues = {
  name: 'Maria da Silva',
  institution: 'SENASP',
  notify: true,
};

const defaultEmail = 'maria@email.com';

const ProfileForm: React.FC = () => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [email] = useState(defaultEmail);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs para inputs, usados para foco automático em erro
  const nameRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const newPwdRef = useRef<HTMLInputElement>(null);

  // Formulário de perfil
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile,
  });

  // Formulário de senha
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    formState: { errors: errorsPwd, isSubmitting: isSubmittingPwd },
    reset: resetPwd,
    setFocus: setFocusPwd,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', newPassword: '' },
  });

  // Foco automático no primeiro campo com erro ao submit do perfil
  useEffect(() => {
    if (errors.name) {
      nameRef.current?.focus();
    } else if (errors.institution) {
      institutionRef.current?.focus();
    }
  }, [errors]);

  // Foco automático no primeiro campo com erro ao submit da senha
  useEffect(() => {
    if (errorsPwd.password) {
      pwdRef.current?.focus();
    } else if (errorsPwd.newPassword) {
      newPwdRef.current?.focus();
    }
  }, [errorsPwd]);

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatar(undefined);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setSuccess('Perfil atualizado com sucesso! (mock)');
    setError(null);
  };

  const onSubmitPwd = async (data: PasswordFormValues) => {
    if (!data.password || !data.newPassword) {
      setError('Preencha todos os campos de senha.');
      setSuccess(null);
      return;
    }
    setSuccess('Senha alterada com sucesso! (mock)');
    setError(null);
    resetPwd();
  };

  return (
    <form className="w-full max-w-lg flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} aria-label="Formulário de perfil do aluno">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Meu perfil</h1>
      <div className="flex flex-col items-center gap-2">
        <AvatarUploader avatarUrl={avatar} onChange={handleAvatarChange} />
      </div>
      {/* Nome */}
      <label htmlFor="name" className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary" id="name-label">Nome</span>
        <input
          id="name"
          type="text"
          className={`border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-error' : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-labelledby="name-label"
          {...register('name')}
          ref={(e) => {
            register('name').ref(e);
            nameRef.current = e;
          }}
        />
        {errors.name && <span id="name-error" className="text-error text-xs" role="alert">{errors.name.message}</span>}
      </label>
      {/* E-mail */}
      <label htmlFor="email" className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary" id="email-label">E-mail</span>
        <input
          id="email"
          type="email"
          className="border border-border rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
          value={email}
          readOnly
          aria-labelledby="email-label"
        />
      </label>
      {/* Instituição */}
      <label htmlFor="institution" className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary" id="institution-label">Instituição</span>
        <input
          id="institution"
          type="text"
          className={`border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.institution ? 'border-error' : ''}`}
          aria-invalid={!!errors.institution}
          aria-describedby={errors.institution ? 'institution-error' : undefined}
          aria-labelledby="institution-label"
          {...register('institution')}
          ref={(e) => {
            register('institution').ref(e);
            institutionRef.current = e;
          }}
        />
        {errors.institution && <span id="institution-error" className="text-error text-xs" role="alert">{errors.institution.message}</span>}
      </label>
      {/* Preferências */}
      <label htmlFor="notify" className="flex items-center gap-2">
        <input
          id="notify"
          type="checkbox"
          {...register('notify')}
          className="accent-primary w-4 h-4"
          aria-checked={!!register('notify')}
        />
        <span className="text-sm text-text-secondary">Receber notificações por e-mail</span>
      </label>
      {/* Botão de salvar com spinner */}
      <button
        type="submit"
        className="bg-primary text-white font-semibold rounded-lg px-6 py-3 text-base shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>}
        {isSubmitting ? 'Salvando...' : 'Salvar perfil'}
      </button>
      {/* Seção de alteração de senha */}
      <div className="border-t border-border pt-4 mt-2">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Alterar senha</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmitPwd(onSubmitPwd)} aria-label="Formulário de alteração de senha">
          <label htmlFor="password" className="flex flex-col gap-1">
            <input
              id="password"
              type="password"
              className={`border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errorsPwd.password ? 'border-error' : ''}`}
              placeholder="Senha atual"
              aria-invalid={!!errorsPwd.password}
              aria-describedby={errorsPwd.password ? 'password-error' : undefined}
              {...registerPwd('password')}
              ref={(e) => {
                registerPwd('password').ref(e);
                pwdRef.current = e;
              }}
            />
            {errorsPwd.password && <span id="password-error" className="text-error text-xs" role="alert">{errorsPwd.password.message}</span>}
          </label>
          <label htmlFor="newPassword" className="flex flex-col gap-1">
            <input
              id="newPassword"
              type="password"
              className={`border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errorsPwd.newPassword ? 'border-error' : ''}`}
              placeholder="Nova senha"
              aria-invalid={!!errorsPwd.newPassword}
              aria-describedby={errorsPwd.newPassword ? 'newPassword-error' : undefined}
              {...registerPwd('newPassword')}
              ref={(e) => {
                registerPwd('newPassword').ref(e);
                newPwdRef.current = e;
              }}
            />
            {errorsPwd.newPassword && <span id="newPassword-error" className="text-error text-xs" role="alert">{errorsPwd.newPassword.message}</span>}
          </label>
          <button
            type="submit"
            className="bg-white border border-primary text-primary font-semibold rounded-lg px-4 py-2 text-sm shadow hover:bg-primary/10 transition-colors mt-2 flex items-center justify-center gap-2"
            disabled={isSubmittingPwd}
            aria-busy={isSubmittingPwd}
          >
            {isSubmittingPwd && <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></span>}
            {isSubmittingPwd ? 'Alterando...' : 'Alterar senha'}
          </button>
        </form>
      </div>
      {/* Mensagens de feedback acessíveis */}
      {success && <div className="text-success text-sm font-medium mt-2" role="alert" tabIndex={0}>{success}</div>}
      {error && <div className="text-error text-sm font-medium mt-2" role="alert" tabIndex={0}>{error}</div>}
    </form>
  );
};

export default ProfileForm; 