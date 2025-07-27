import React from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import { HomePageSkeleton } from '@/components/home/HomePageSkeleton';
import Footer from '@/components/layout/Footer';

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col">
      <PublicHeader />
      <HomePageSkeleton />
      <Footer />
    </main>
  );
} 