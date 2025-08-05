 'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '@/validations/profile-schema';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';
import { UserViewModel } from '@/viewmodels/user/UserViewModel';
import { useAuth } from '@/hooks/useAuth';

const ProfileSettingsForm: React.FC = () => {
  const { user } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      institution: user?.institution || '',
      notify: true,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setApiError(null);
    setSuccess(null);
    
    try {
      // Aqui você faria a chamada para atualizar o perfil
      // await UserViewModel.getInstance().updateProfile(data);
      
      setSuccess('Perfil atualizado com sucesso!');
      reset(data); // Reset com os novos valores
    } catch (err: any) {
      setApiError(err.message || 'Erro ao atualizar perfil');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Informações pessoais</h2>
        <p className="text-sm text-gray-600">
          Atualize suas informações pessoais e de contato
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {apiError && <Alert message={apiError} variant="error" />}
        {success && <Alert message={success} variant="success" />}

        <InputField
          type="text"
          placeholder="Digite seu nome completo"
          {...register('name')}
          error={!!errors.name}
          hint={errors.name?.message}
        />

        <InputField
          type="email"
          placeholder="seu@email.com"
          defaultValue={user?.email || ''}
          disabled={true}
          hint="O e-mail não pode ser alterado"
        />

        <InputField
          type="text"
          placeholder="Digite o nome da sua instituição"
          {...register('institution')}
          error={!!errors.institution}
          hint={errors.institution?.message}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('notify')}
            className="accent-[#B5D334] w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            Receber notificações por e-mail
          </span>
        </label>

        <Button
          type="submit"
          className="w-full"
          size="md"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettingsForm;