 'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  courseUpdates: boolean;
  newCourses: boolean;
  events: boolean;
  announcements: boolean;
}

const NotificationSettingsForm: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    courseUpdates: true,
    newCourses: false,
    events: true,
    announcements: true,
  });
  const [success, setSuccess] = useState<string | null>(null);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    try {
      // Aqui você salvaria as configurações
      // await NotificationService.updateSettings(settings);
      
      setSuccess('Configurações de notificação salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Preferências de notificação</h2>
        <p className="text-sm text-gray-600">
          Escolha como e quando você quer receber notificações
        </p>
      </div>

      {success && <Alert message={success} variant="success" />}

      <div className="space-y-4">
        {/* Canais de notificação */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-3">Canais de notificação</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">E-mail</span>
                <p className="text-xs text-gray-500">Receber notificações por e-mail</p>
              </div>
              <input
                type="checkbox"
                checked={settings.email}
                onChange={() => handleToggle('email')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Notificações push</span>
                <p className="text-xs text-gray-500">Receber notificações no navegador</p>
              </div>
              <input
                type="checkbox"
                checked={settings.push}
                onChange={() => handleToggle('push')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Tipos de notificação */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-3">Tipos de notificação</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Atualizações de cursos</span>
                <p className="text-xs text-gray-500">Novos módulos e conteúdos</p>
              </div>
              <input
                type="checkbox"
                checked={settings.courseUpdates}
                onChange={() => handleToggle('courseUpdates')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Novos cursos</span>
                <p className="text-xs text-gray-500">Cursos recém-lançados</p>
              </div>
              <input
                type="checkbox"
                checked={settings.newCourses}
                onChange={() => handleToggle('newCourses')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Eventos</span>
                <p className="text-xs text-gray-500">Webinars e aulões ao vivo</p>
              </div>
              <input
                type="checkbox"
                checked={settings.events}
                onChange={() => handleToggle('events')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Anúncios</span>
                <p className="text-xs text-gray-500">Notícias e comunicados importantes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.announcements}
                onChange={() => handleToggle('announcements')}
                className="accent-[#B5D334] w-4 h-4"
              />
            </label>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full"
        size="md"
        variant="primary"
      >
        Salvar preferências
      </Button>
    </div>
  );
};

export default NotificationSettingsForm;