import AuthLayout from '@/components/auth/AuthLayout';
import VerificationCodeForm from '@/components/auth/VerificationCodeForm';

export const metadata = {
  title: 'Verificação de código | Berkana Academy',
  description: 'Digite o código enviado para seu e-mail para concluir o cadastro na Berkana Academy.',
};

export default function VerificationPage() {
  return (
    <AuthLayout imageSrc="/images/auth-bg-register.png" imageAlt="Berkana Academy">
      <VerificationCodeForm />
    </AuthLayout>
  );
} 