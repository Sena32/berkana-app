import StudentLayout from '@/components/layout/StudentLayout';
import CourseDetailPage from '@/components/course/CourseDetailPage';

export const metadata = {
  title: 'Detalhe do Curso | Berkana Academy',
  description: 'Acompanhe seu progresso e acesse o conteúdo do curso.',
};

export default function StudentCourseDetailPage() {
  return (
    <StudentLayout>
      <CourseDetailPage />
    </StudentLayout>
  );
} 