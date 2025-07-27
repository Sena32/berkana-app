import React from 'react';
import { SkeletonLoader } from '@/components/common/Skeleton';

const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      {/* Imagem skeleton */}
      <div className="relative w-full h-36">
        <SkeletonLoader 
          height={144} 
          className="rounded-lg"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
      </div>
      
      {/* Título skeleton */}
      <SkeletonLoader 
        height={20} 
        width="80%" 
        className="mb-1"
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb"
      />
      
      {/* Categoria skeleton */}
      <SkeletonLoader 
        height={14} 
        width="30%" 
        className="mb-2"
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb"
      />
      
      {/* Status e rating skeleton */}
      <div className="flex items-center gap-2 justify-between">
        <SkeletonLoader 
          height={14} 
          width="20%" 
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
        <div className="flex items-center gap-1">
          <SkeletonLoader 
            height={14} 
            width={16} 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
          <SkeletonLoader 
            height={14} 
            width="40%" 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
        </div>
      </div>
      
      {/* Detalhes skeleton */}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-1">
          <SkeletonLoader 
            height={14} 
            width={16} 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
          <SkeletonLoader 
            height={14} 
            width="60%" 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
        </div>
        <div className="flex items-center gap-1">
          <SkeletonLoader 
            height={14} 
            width={16} 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
          <SkeletonLoader 
            height={14} 
            width="50%" 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
        </div>
        <div className="flex items-center gap-1">
          <SkeletonLoader 
            height={14} 
            width={16} 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
          <SkeletonLoader 
            height={14} 
            width="40%" 
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton; 