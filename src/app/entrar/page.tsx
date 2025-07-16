import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Entrar | Berkana Academy',
  description: 'Acesse sua conta na Berkana Academy para continuar seus estudos.',
};

export default function LoginPage() {
  return (
    <AuthLayout imageSrc="/images/auth-bg.png" imageAlt="Berkana Academy">
      <LoginForm />
    </AuthLayout>
  );
} 