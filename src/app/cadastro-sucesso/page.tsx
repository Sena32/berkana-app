import AuthLayout from '@/components/auth/AuthLayout';
import SuccessRequestCard from '@/components/auth/SuccessRequestCard';

export const metadata = {
  title: 'Cadastro em validação | Berkana Academy',
  description: 'Sua solicitação de cadastro está em validação. Em breve você terá acesso à sua área de aprendizagem.',
};

export default function SuccessRequestPage() {
  return (
    <AuthLayout imageSrc="/images/auth-bg-register.png" imageAlt="Berkana Academy">
      <SuccessRequestCard />
    </AuthLayout>
  );
} 