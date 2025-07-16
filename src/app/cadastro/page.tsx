import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Cadastro | Berkana Academy',
  description: 'Crie sua conta na Berkana Academy e comece a aprender agora mesmo.',
};

export default function RegisterPage() {
  return (
    <AuthLayout imageSrc="/images/auth-bg-register.png" imageAlt="Berkana Academy">
      <RegisterForm />
    </AuthLayout>
  );
} 