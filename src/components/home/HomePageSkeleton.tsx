import React from 'react';
import { SkeletonLoader } from '@/components/common/Skeleton';

export function HomePageSkeleton() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SkeletonLoader height={48} width="80%" className="mb-4" />
              <SkeletonLoader height={24} count={3} className="mb-6" />
              <div className="flex gap-4">
                <SkeletonLoader height={48} width={160} borderRadius={8} />
                <SkeletonLoader height={48} width={140} borderRadius={8} />
              </div>
            </div>
            <div className="relative">
              <SkeletonLoader height={400} className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section Skeleton */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SkeletonLoader height={32} width="40%" className="mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} height={60} className="rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section Skeleton */}
      <section className="py-16 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader height={40} width="50%" className="mx-auto mb-4" />
            <SkeletonLoader height={20} width="60%" className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
                <SkeletonLoader height={144} className="rounded-lg" />
                <SkeletonLoader height={20} width="80%" />
                <SkeletonLoader height={14} width="30%" />
                <div className="flex items-center gap-2 justify-between">
                  <SkeletonLoader height={14} width="20%" />
                  <div className="flex items-center gap-1">
                    <SkeletonLoader height={14} width={16} />
                    <SkeletonLoader height={14} width="40%" />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1">
                    <SkeletonLoader height={14} width={16} />
                    <SkeletonLoader height={14} width="60%" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonLoader height={14} width={16} />
                    <SkeletonLoader height={14} width="50%" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonLoader height={14} width={16} />
                    <SkeletonLoader height={14} width="40%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid Skeleton */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader height={40} width="50%" className="mx-auto mb-4" />
            <SkeletonLoader height={20} width="60%" className="mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <SkeletonLoader height={48} width={48} className="mx-auto mb-4" />
                <SkeletonLoader height={20} width="80%" className="mx-auto mb-2" />
                <SkeletonLoader height={16} width="60%" className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Berkana Section Skeleton */}
      <section className="py-16 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader height={40} width="50%" className="mx-auto mb-4" />
            <SkeletonLoader height={20} width="60%" className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <SkeletonLoader height={64} width={64} className="mx-auto mb-4" />
                <SkeletonLoader height={24} width="80%" className="mx-auto mb-3" />
                <SkeletonLoader height={16} count={3} className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor List Skeleton */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader height={40} width="50%" className="mx-auto mb-4" />
            <SkeletonLoader height={20} width="60%" className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <SkeletonLoader height={120} width={120} circle className="mx-auto mb-4" />
                <SkeletonLoader height={20} width="70%" className="mx-auto mb-2" />
                <SkeletonLoader height={16} width="50%" className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-16 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader height={40} width="50%" className="mx-auto mb-4" />
            <SkeletonLoader height={20} width="60%" className="mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <SkeletonLoader height={20} count={4} className="mb-6" />
              <div className="flex items-center gap-4">
                <SkeletonLoader height={60} width={60} circle />
                <div>
                  <SkeletonLoader height={20} width="40%" className="mb-2" />
                  <SkeletonLoader height={16} width="30%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageSkeleton; 