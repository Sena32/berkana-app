'use client';

import React, { useState } from 'react';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';
import { BellIcon } from '@heroicons/react/24/outline';

const StudentNotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotifications] = useState(true); // Mock - você pode conectar com um estado real

  const notifications = [
    {
      id: 1,
      title: 'Novo curso disponível',
      message: 'O curso "Língua e Comunicação" está disponível para você',
      time: '2 min atrás',
      read: false,
    },
    {
      id: 2,
      title: 'Evento próximo',
      message: 'Aulão ao vivo Licitações em 1 hora',
      time: '1 hora atrás',
      read: false,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {hasNotifications && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute right-0 mt-2 w-80"
      >
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Notificações</h3>
            <button className="text-sm text-[#B5D334] hover:underline">
              Marcar todas como lidas
            </button>
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                onItemClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-[#B5D334]'}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">{notification.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                </div>
              </DropdownItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Nenhuma notificação
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <button className="w-full text-sm text-[#B5D334] hover:underline">
            Ver todas as notificações
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default StudentNotificationDropdown; 