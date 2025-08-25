"use client";
import { useState, useEffect, useCallback } from "react";
import CourseFilters from "./CourseFilters";
import CourseList from "./CourseList";
import CourseListSkeleton from "./CourseListSkeleton";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CallToAction from "@/components/home/CallToAction";
import Alert from '@/components/common/Alert';
import { CourseViewModel } from "@/viewmodels/course/CourseViewModel";
import { useDebounce } from "@/hooks/useDebounce";
import { Course } from "@/types/course";


export default function CoursesClient() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const fetchCourses = useCallback(async (name: string|null) => {
    setLoading(true);
    setError(null);
    try {
      const nameParam = name && name.length > 3 ? name: "";
      const res = await CourseViewModel.getInstance().listPublicCourses(1, nameParam);
      setCourses(res?.courses || []);
    } catch (err: any) {
      console.error('Erro ao carregar cursos na página de cursos:', err);
      setError("Erro ao carregar cursos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(debouncedSearch.length === 0) {
      fetchCourses(null);
    }
    if(debouncedSearch.length > 3) {
      fetchCourses(debouncedSearch);
    }
  }, [debouncedSearch, fetchCourses]);

  useEffect(() => {
    fetchCourses(null);
  }, []);

  return (
    <main className="min-h-screen flex flex-col ">
      <PublicHeader />
      <section className="max-w-7xl mx-auto w-full py-10 px-4 sm:px-8">
        <h1 className="text-2xl md:text-4xl font-bold text-text-primary mb-2">Explorar cursos</h1>
        <p className="text-text-secondary text-base mb-6">Busque cursos por área, instituição ou palavra-chave.</p>
        <CourseFilters onChangeSearch={setSearch} />
        
        {loading ? (
          <CourseListSkeleton count={6} />
        ) : error ? (
          <div className="max-w-md mx-auto">
            <Alert message={error} variant="error" />
          </div>
        ) : (
          <CourseList 
          courses={courses}         
          navigation={{
            enabled: true,
            baseUrl: "/cursos",
            useRouter: false // Usar Link em vez de useRouter
          }}/>
        )}
      </section>
      <TestimonialsCarousel />
      <CallToAction />
      <Footer />
    </main>
  );
} 