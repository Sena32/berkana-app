import PublicHeader from '@/components/layout/PublicHeader';
import CourseList from '@/components/course/CourseList';
import Footer from '@/components/layout/Footer';
import CallToAction from '@/components/home/CallToAction';
import CourseDetailPageComponent from '@/components/course/CourseDetailPage';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';

// Função utilitária para buscar cursos com tratamento de erro
async function getCoursesSafe(id: string) {
  try {
    const courses = await CourseViewModel.getInstance().listHomeCourses(1);
    console.log('courses public', courses);
    return { courses: courses?.courses.filter((course: any) => course.id !== id) || [], error: null };
  } catch (error: any) {
    console.error('Erro ao carregar cursos na home:', error);
    return { courses: [], error: error?.message || 'Erro ao carregar cursos. Tente novamente mais tarde.' };
  }
}

export const metadata = {
  title: `Berkana Academy | Curso`,
  description: 'Capacitação de qualidade para servidores públicos e colaboradores de instituições privadas. Escolha um curso, aprenda no seu ritmo e conquiste novas oportunidades!'
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ moduleId?: string }>;
}

export default async function CourseDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  let moduleId: string | null = null;

  if (searchParams) {
    const resolvedSearchParams = await searchParams;
    moduleId = resolvedSearchParams.moduleId || null;
  }
  
  // Buscar cursos recomendados
  const { courses: coursesRecomended, error } = await getCoursesSafe(id);

  return (
    <main className="min-h-screen flex flex-col ">
      <PublicHeader />
      <section className='py-10 px-4 sm:px-8'>
        <CourseDetailPageComponent 
          backLink="/cursos" 
          courseId={id} 
          moduleId={moduleId}
          autoLoad={true} 
          isPublic={true}
        />
      </section>
      
      {/* Cursos para você */}
      {coursesRecomended.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <CourseList 
            courses={coursesRecomended}
            title="Cursos para você"
            cardType="default"
            navigation={
              {
                baseUrl: '/cursos',
                useRouter: false,
                enabled: true,
              }
            }
          />
        </div>
      )}
      <CallToAction />
      <Footer />
    </main>
  );
} 