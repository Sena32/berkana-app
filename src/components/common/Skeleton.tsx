'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: number | string;
  width?: number | string;
  circle?: boolean;
  borderRadius?: number;
  baseColor?: string;
  highlightColor?: string;
  duration?: number;
  wrapper?: React.ComponentType<any>;
  style?: React.CSSProperties;
}

export function SkeletonLoader({
  className,
  count = 1,
  height,
  width,
  circle = false,
  borderRadius,
  baseColor,
  highlightColor,
  duration = 1.5,
  wrapper,
  style,
  ...props
}: SkeletonProps) {
  return (
    <Skeleton
      className={cn('animate-pulse', className)}
      count={count}
      height={height}
      width={width}
      circle={circle}
      borderRadius={borderRadius}
      baseColor={baseColor || 'var(--color-gray-200)'}
      highlightColor={highlightColor || 'var(--color-gray-100)'}
      duration={duration}
      wrapper={wrapper as React.FunctionComponent<{ children?: React.ReactNode }>}
      style={style}
      {...props}
    />
  );
}

// Componentes pré-configurados para uso comum
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 border border-gray-200 rounded-lg', className)}>
      <SkeletonLoader height={20} width="60%" className="mb-3" />
      <SkeletonLoader height={16} count={3} className="mb-2" />
      <SkeletonLoader height={16} width="40%" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <SkeletonLoader height={16} />
        </td>
      ))}
    </tr>
  );
}

export function AvatarSkeleton({ size = 40 }: { size?: number }) {
  return (
    <SkeletonLoader
      circle
      height={size}
      width={size}
      className="flex-shrink-0"
    />
  );
}

export function TextSkeleton({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          height={16}
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonLoader
      height={40}
      width={120}
      borderRadius={8}
      className={className}
    />
  );
}

export function InputSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonLoader
      height={48}
      borderRadius={8}
      className={className}
    />
  );
}

export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <SkeletonLoader height={32} width={200} />
        <SkeletonLoader height={40} width={120} />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonLoader height={24} width="40%" className="mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <AvatarSkeleton size={40} />
                <div className="flex-1">
                  <SkeletonLoader height={16} width="60%" className="mb-1" />
                  <SkeletonLoader height={14} width="40%" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SkeletonLoader height={24} width="50%" className="mb-4" />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export { default as CourseCardSkeleton } from '../course/CourseCardSkeleton';
export { default as CourseListSkeleton } from '../course/CourseListSkeleton';