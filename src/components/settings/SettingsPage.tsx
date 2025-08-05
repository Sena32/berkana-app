 'use client';
import React, { useState } from 'react';
import ProfileSettingsForm from './ProfileSettingsForm';
import PasswordSettingsForm from './PasswordSettingsForm';
import NotificationSettingsForm from './NotificationSettingsForm';
import AccountSettingsForm from './AccountSettingsForm';

type SettingsTab = 'profile' | 'password' | 'notifications' | 'account';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Perfil'},
    { id: 'password', label: 'Senha' },
    { id: 'notifications', label: 'Notificações' },
    { id: 'account', label: 'Conta' },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettingsForm />;
      case 'password':
        return <PasswordSettingsForm />;
      case 'notifications':
        return <NotificationSettingsForm />;
      case 'account':
        return <AccountSettingsForm />;
      default:
        return <ProfileSettingsForm />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">
          Gerencie suas informações pessoais e preferências da conta
        </p>
      </div>

      {/* Tabs de navegação */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#B5D334] text-[#B5D334]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
                {/* <span className="mr-2">{tab.icon}</span> */}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;