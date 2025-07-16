import React from 'react';
import CourseCard, { CourseCardProps } from './CourseCard';

interface CourseListProps {
  courses: CourseCardProps[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
};

export default CourseList; 