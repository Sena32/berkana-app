'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';

const StudentUserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-[#B5D334] flex items-center justify-center">
          <span className="text-[#16285E] font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute right-0 mt-2 w-48"
      >
        <div className="p-3 border-b border-gray-200">
          <div className="font-medium text-gray-900">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
        
        <div className="p-1">
          <DropdownItem
            onItemClick={() => setIsOpen(false)}
            tag="a"
            href="/aluno/perfil"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Meu Perfil
          </DropdownItem>
          
          <DropdownItem
            onItemClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
};

export default StudentUserDropdown; 