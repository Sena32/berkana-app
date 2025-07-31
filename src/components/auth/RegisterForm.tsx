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
      // Adapte conforme o DTO da API
      await UserViewModel.getInstance().createPublicUser({
        email: data.email,
        name: data.name,
        lastName: "", // Adapte se quiser pedir no form
        institution: data.institution,
        profile: UserProfile.ALUNO, // Ou permita escolher
        cpf: "", // Adapte se quiser pedir no form
      });
      setSuccess(true);
      reset();
      router.push("/cadastro-sucesso");
    } catch (err: any) {
      setApiError(err.message || "Erro ao criar usuário");
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Criar uma conta</h1>
      <div className="text-sm text-text-secondary mb-2">
        Já tem um cadastro? <a href="/entrar" className="text-primary font-medium hover:underline">Entrar</a>
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
          className="accent-primary w-4 h-4"
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