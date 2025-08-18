'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/validations/register-schema";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Alert from "@/components/common/Alert";
import { UserViewModel } from "@/viewmodels/user/UserViewModel";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara do CPF
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    setApiError(null);
    try {
      // Remove formatação do CPF antes de enviar para a API
      const cleanCPF = data.cpf.replace(/\D/g, '');
      
      // Adapte conforme o DTO da API
      const viewModel = UserViewModel.getInstance();
      await viewModel.createPublicUser({
        email: data.email,
        name: data.name,
        lastName: data.lastName, // Agora usando o sobrenome do formulário
        institution: data.institution,
        cpf: cleanCPF, // CPF limpo (apenas números)
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      setSuccess(true);
      reset();
      router.push("/cadastro-sucesso");
    } catch (err: any) {
      console.log('error onSubmit registerForm', err);
      setApiError(err.message || "Erro ao criar usuário");
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Criar uma conta</h1>
      <div className="text-sm text-text-secondary mb-2">
        Já tem um cadastro? <a href="/entrar" className="text-[#B5D334] font-semibold hover:underline transition-colors">Entrar</a>
      </div>
      {apiError && <Alert message={apiError} variant="error" />}
      {success && <Alert message="Cadastro realizado com sucesso!" variant="success" />}
      <InputField
        type="email"
        placeholder="seu@email.com"
        {...register("email")}
        error={!!errors.email}
        hint={errors.email?.message}
      />
      <InputField
        type="text"
        placeholder="Digite seu nome"
        {...register("name")}
        error={!!errors.name}
        hint={errors.name?.message}
      />
      <InputField
        type="text"
        placeholder="Digite seu sobrenome"
        {...register("lastName")}
        error={!!errors.lastName}
        hint={errors.lastName?.message}
      />
      <InputField
        type="text"
        placeholder="Digite seu CPF"
        {...register("cpf", {
          onChange: (e) => {
            const formatted = formatCPF(e.target.value);
            e.target.value = formatted;
          }
        })}
        error={!!errors.cpf}
        hint={errors.cpf?.message}
      />
      <InputField
        type="text"
        placeholder="Digite o nome da empresa onde trabalha"
        {...register("institution")}
        error={!!errors.institution}
        hint={errors.institution?.message}
      />
      <InputField
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
        error={!!errors.password}
        hint={errors.password?.message}
      />
      <InputField
        type="password"
        placeholder="Confirme sua senha"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        hint={errors.confirmPassword?.message}
      />
      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          {...register("acceptTerms")}
          className="accent-[#B5D334] w-4 h-4"
        />
        <span className="text-xs text-text-secondary">
          Ao criar uma conta você estará de acordo com nossos <a href="/termos" className="text-primary hover:underline">Termos de Uso</a> e <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
        </span>
      </label>
      {errors.acceptTerms && (
        <span className="text-error text-xs">{errors.acceptTerms.message}</span>
      )}
      <Button
        type="submit"
        className="mt-2"
        size="md"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Continuar"}
      </Button>
    </form>
  );
};

export default RegisterForm; 