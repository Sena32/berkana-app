import React from 'react';
import CourseCardSkeleton from './CourseCardSkeleton';

interface CourseListSkeletonProps {
  count?: number;
}

const CourseListSkeleton: React.FC<CourseListSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CourseListSkeleton; 