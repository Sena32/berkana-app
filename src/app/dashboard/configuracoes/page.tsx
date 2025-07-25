import React from 'react';
import ProfileForm from '@/components/user/ProfileForm';
import StudentSidebar from '@/components/layout/StudentSidebar';

const ConfiguracoesPage: React.FC = () => {
  return (
    <div className="flex min-h-screen ">
      <div className="hidden md:block">
        <StudentSidebar />
      </div>
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-text-primary">Configurações da conta</h1>
          <ProfileForm />
        </div>
      </main>
    </div>
  );
};

export default ConfiguracoesPage; 