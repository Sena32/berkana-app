'use client';

import { useAuth } from '@/hooks/useAuth';

export function AuthMonitor() {
  // Este componente usa o hook useAuth para monitorar automaticamente
  // a sessão e forçar logout quando necessário
  useAuth();
  
  // Componente invisível que apenas monitora
  return null;
} 