 'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';
import { useAuth } from '@/hooks/useAuth';

const AccountSettingsForm: React.FC = () => {
  const { logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Aqui você faria a chamada para deletar a conta
      // await UserService.deleteAccount();
      await logout();
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Configurações da conta</h2>
        <p className="text-sm text-gray-600">
          Gerencie suas configurações de conta e privacidade
        </p>
      </div>

      <div className="space-y-4">
        {/* Sessão atual */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Sessão atual</h3>
          <p className="text-sm text-gray-600 mb-3">
            Você está logado em um dispositivo. Para sua segurança, faça logout quando terminar.
          </p>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
          >
            Fazer logout
          </Button>
        </div>

        {/* Privacidade */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">Privacidade</h3>
          <p className="text-sm text-gray-600 mb-3">
            Gerencie suas configurações de privacidade e dados pessoais.
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              �� Baixar meus dados
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              🗑️ Solicitar exclusão de dados
            </Button>
          </div>
        </div>

        {/* Zona de perigo */}
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <h3 className="text-md font-medium text-red-900 mb-2">Zona de perigo</h3>
          <p className="text-sm text-red-700 mb-3">
            Ações irreversíveis. Tenha cuidado ao executar estas operações.
          </p>
          
          {!showDeleteConfirm ? (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Deletar minha conta
            </Button>
          ) : (
            <div className="space-y-2">
              <Alert 
                message="Tem certeza? Esta ação não pode ser desfeita." 
                variant="warning" 
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAccount}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Sim, deletar conta
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;