import StudentLayout from '@/components/layout/StudentLayout';
import CourseDetailPage from '@/components/course/CourseDetailPage';

export const metadata = {
  title: 'Detalhe do Curso | Berkana Academy',
  description: 'Acompanhe seu progresso e acesse o conteúdo do curso.',
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ moduleId?: string }>;
}

export default async function StudentCourseDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  let moduleId: string | null = null;

  if (searchParams) {
    const resolvedSearchParams = await searchParams;
    moduleId = resolvedSearchParams.moduleId || null;
  }

  return (
    <StudentLayout>
      <CourseDetailPage 
        autoLoad={true} 
        courseId={id} 
        moduleId={moduleId}
      />
    </StudentLayout>
  );
} 