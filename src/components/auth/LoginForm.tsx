"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/validations/auth/login-schema";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    // Aqui iria a chamada real de login
    alert("Login mockado com sucesso!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Entrar</h1>
      <div className="text-sm text-text-secondary mb-2">
        Novo aqui? <a href="/cadastro" className="text-[#04A4F4] font-semibold hover:underline transition-colors">Crie uma conta</a>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">E-mail institucional</span>
        <InputField
          type="email"
          placeholder="seu@email.com"
          {...register("email")}
          error={!!errors.email}
          hint={errors.email?.message}
        />
      </label>
      <label className="flex flex-col gap-1 relative">
        <span className="text-sm font-medium text-text-primary">Senha</span>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          {...register("password")}
          error={!!errors.password}
          hint={errors.password?.message}
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-[#B5D334]"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.969 9.969 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.896-4.21 2.343-5.657" /></svg>
          )}
        </button>
      </label>
      <div className="flex justify-between items-center text-sm mt-2 gap-2">
        <a href="/esqueci-senha" className="text-gray-500 hover:text-[#B5D334] transition-colors">Esqueceu sua senha?</a>
        <Button
          type="submit"
          className="w-36 h-12"
          size="md"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm; 