'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  const avatarImg = user?.avatar && user.avatar !== '' 
    ? `/api/images/users/avatar/${user.avatar}` 
    : null;
    
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-[#B5D334] flex items-center justify-center overflow-hidden">
          {avatarImg?(
            <Image 
              src={avatarImg} 
              alt={user?.name || 'Usuário'}
              unoptimized={true}
              fill
              className="w-full h-full object-cover rounded-full"
              priority={false}
            />
          ):(
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="22" fill="#E5E7EB"/>
            <path d="M22 22C24.7614 22 27 19.7614 27 17C27 14.2386 24.7614 12 22 12C19.2386 12 17 14.2386 17 17C17 19.7614 19.2386 22 22 22Z" fill="#9CA3AF"/>
            <path d="M22 24C17.5817 24 14 27.5817 14 32H30C30 27.5817 26.4183 24 22 24Z" fill="#9CA3AF"/>
          </svg>
          )}
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
            href="/aluno/configuracoes"
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