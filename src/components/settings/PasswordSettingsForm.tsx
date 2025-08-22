 'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormValues } from '@/validations/profile-schema';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';

const PasswordSettingsForm: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setApiError(null);
    setSuccess(null);
    
    try {
      // Aqui você faria a chamada para alterar a senha
      // await AuthService.changePassword(data);
      
      setSuccess('Senha alterada com sucesso!');
      reset();
    } catch (err: any) {
      setApiError(err.message || 'Erro ao alterar senha');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Alterar senha</h2>
        <p className="text-sm text-gray-600">
          Mantenha sua conta segura alterando sua senha regularmente
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {apiError && <Alert message={apiError} variant="error" />}
        {success && <Alert message={success} variant="success" />}

        <InputField
          type="password"
          placeholder="Digite sua senha atual"
          {...register('password')}
          error={!!errors.password}
          hint={errors.password?.message}
        />

        <InputField
          type="password"
          placeholder="Digite sua nova senha"
          {...register('newPassword')}
          error={!!errors.newPassword}
          hint={errors.newPassword?.message}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Dicas para uma senha segura:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use pelo menos 6 caracteres</li>
            <li>• Combine letras maiúsculas e minúsculas</li>
            <li>• Inclua números e símbolos</li>
            <li>• Evite informações pessoais</li>
          </ul>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="md"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Alterando...' : 'Alterar senha'}
        </Button>
      </form>
    </div>
  );
};

export default PasswordSettingsForm;