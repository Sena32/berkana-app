'use client';

import React, { useState } from 'react';

const menu = [
  { label: 'Meu aprendizado', href: '/dashboard', icon: '📚' },
  { label: 'Cursos', href: '/dashboard/cursos', icon: '🎓' },
  { label: 'Agenda e Eventos', href: '/dashboard/agenda', icon: '📅' },
  { label: 'Suporte', href: '/dashboard/suporte', icon: '💬' },
  { label: 'Configurações', href: '/dashboard/configuracoes', icon: '⚙️' },
];

const StudentSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`bg-white border-r border-border min-h-screen flex flex-col ${open ? 'w-56' : 'w-16'} transition-all duration-200`}>
      <button
        className="md:hidden p-3 text-primary self-end"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? '←' : '☰'}
      </button>
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {menu.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-text-primary font-medium hover:bg-primary/10 transition-colors ${open ? 'justify-start' : 'justify-center'}`}
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span className="truncate">{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar; 