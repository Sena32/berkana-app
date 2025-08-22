"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/validations/auth/login-schema";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      
      if (result?.error) {
        console.error("Erro no login:", result.error);
        // Aqui você pode adicionar um toast ou mensagem de erro
        return;
      }
      
      if (result?.ok) {
        // Login bem-sucedido, redireciona
        router.push("/aluno");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      // Aqui você pode adicionar um toast ou mensagem de erro
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Entrar</h1>
      <div className="text-sm text-text-secondary mb-2">
        Novo aqui? <a href="/cadastro" className="text-[#B5D334] font-semibold hover:underline transition-colors">Crie uma conta</a>
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
          className="absolute right-3 top-6 text-gray-400 hover:text-[#B5D334]"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <EyeSlashIcon className="h-6 w-6 text-gray-700" />
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
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm; 