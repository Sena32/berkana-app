'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SkeletonLoader } from './Skeleton';

interface LoadingWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  skeleton?: ReactNode;
  className?: string;
  minHeight?: string;
}

export function LoadingWrapper({
  children,
  isLoading = false,
  skeleton,
  className,
  minHeight = 'auto'
}: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div className={cn('w-full', className)} style={{ minHeight }}>
        {skeleton || <SkeletonLoader height={200} />}
      </div>
    );
  }

  return <>{children}</>;
}

// Componente específico para listas
export function ListLoadingWrapper({
  children,
  isLoading = false,
  itemCount = 3,
  className
}: {
  children: ReactNode;
  isLoading?: boolean;
  itemCount?: number;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <SkeletonLoader circle height={40} width={40} />
            <div className="flex-1">
              <SkeletonLoader height={16} width="60%" className="mb-1" />
              <SkeletonLoader height={14} width="40%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <>{children}</>;
} 