'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/context/SidebarContext';
import StudentUserDropdown from './StudentUserDropdown';
import StudentNotificationDropdown from './StudentNotificationDropdown';

const StudentHeader: React.FC = () => {
  const { toggleMobileSidebar } = useSidebar();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
    { label: 'Visão geral', href: '/aluno', active: true },
    { label: 'Meus cursos', href: '/aluno/cursos' },
    { label: 'Meus eventos', href: '/aluno/eventos' },
    { label: 'Meu perfil', href: '/aluno/perfil' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Mobile menu button and navigation */}
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMobileSidebar}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors
                  ${item.active 
                    ? 'text-[#B5D334]' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side - Search, notifications, user */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notifications */}
          <StudentNotificationDropdown />

          {/* User dropdown */}
          <StudentUserDropdown />
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSearchOpen(false)}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5D334] focus:border-[#B5D334]"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default StudentHeader; 