'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import { BookOpenIcon, CalendarIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { 
    label: 'Início', 
    href: '/aluno', 
    icon: <HomeIcon className="w-6 h-6" />
  },
  { 
    label: 'Cursos', 
    href: '/aluno/cursos',
    hasSubmenu: true,
    subItems: [
      { label: 'Meus cursos', href: '/aluno/meus-cursos' },
      { label: 'Explorar cursos', href: '/aluno/explorar-cursos' }
    ],
    icon: <BookOpenIcon className="w-6 h-6" />
  },
  { 
    label: 'Agenda e Eventos', 
    href: '/aluno/agenda', 
    icon: <CalendarIcon className="w-6 h-6" />
  },
  { 
    label: 'Suporte', 
    href: '/aluno/suporte', 
    icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
  },
  { 
    label: 'Configurações', 
    href: '/aluno/configuracoes', 
    icon: <Cog6ToothIcon className="w-6 h-6" />
  },
];

const StudentSidebar: React.FC = () => {
  const pathname = usePathname();
  const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href;
  const isSubmenuActive = (subItems: any[]) => subItems.some(item => isActive(item.href));

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isExpanded ? 'w-64' : 'w-16'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/images/brand/logo-berkana.svg" 
                alt="Logo Berkana"
                unoptimized={true}
                width={150}
                height={100}
                className="mb-4"
                priority={false}
              />
            </Link>
            </div>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileSidebar}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.href) || (item.hasSubmenu && isSubmenuActive(item.subItems || []));
                const submenuOpen = openSubmenu === item.label;
                
                return (
                  <li key={item.href}>
                    {item.hasSubmenu ? (
                      <div>
                        <button
                          onClick={() => setOpenSubmenu(submenuOpen ? null : item.label)}
                          className={`
                            flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
                            ${active 
                              ? 'bg-[#B5D334] text-[#16285E]' 
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0">{item.icon}</span>
                            {<span>{item.label}</span>}
                          </div>
                          {(
                            <svg 
                              width="16" 
                              height="16" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              className={`transition-transform ${submenuOpen ? 'rotate-180' : ''}`}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>
                        
                        {submenuOpen && item.subItems && (
                          <ul className="ml-6 mt-2 space-y-1">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={`
                                    block px-3 py-2 rounded-lg text-sm transition-colors
                                    ${isActive(subItem.href)
                                      ? 'bg-[#B5D334] text-[#16285E]' 
                                      : 'text-gray-600 hover:bg-gray-100'
                                    }
                                  `}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${active 
                            ? 'bg-[#B5D334] text-[#16285E]' 
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        {<span>{item.label}</span>}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar; 