'use client';

import React from 'react';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className="lg:ml-64">
        <StudentHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout; 