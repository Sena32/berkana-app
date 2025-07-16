import PublicHeader from '@/components/layout/PublicHeader';
import CourseHero from '@/components/course/CourseHero';
import Tabs from '@/components/common/Tabs';
import CourseProgram, { CourseModule } from '@/components/course/CourseProgram';
import CourseList from '@/components/course/CourseList';
import { mockCourses } from '@/mocks/course-mock';
import Footer from '@/components/layout/Footer';

// Mock do curso selecionado
const course = mockCourses[0];
const modules: CourseModule[] = [
  { title: 'Medidas de Correção', description: 'Prevenção e Repressão dos Desvios de Conduta.', duration: '10:00' },
  { title: 'Estrutura Correcional', description: 'Prevenção ao Desvio de Conduta.', duration: '10:00' },
  { title: 'Imagem Institucional', description: 'Consequências práticas e jurídicas.', duration: '10:00' },
];

export const metadata = {
  title: `${course.title} | Berkana Academy`,
  description: course.description,
};

export default function CourseDetailPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <section className="max-w-5xl mx-auto w-full py-10 px-4 sm:px-8">
        <CourseHero {...course} />
        <Tabs
          tabs={[
            {
              label: 'Sobre',
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Descrição</h3>
                  <p className="text-text-secondary mb-6">{course.description}</p>
                  <CourseProgram modules={modules} />
                </div>
              ),
            },
            {
              label: 'Certificado',
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Certificado de conclusão</h3>
                  <p className="text-text-secondary">O certificado de conclusão deste curso é emitido por {course.institution}.</p>
                </div>
              ),
            },
            {
              label: 'Avaliações',
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Avaliações</h3>
                  <p className="text-text-secondary">Em breve, avaliações de alunos aparecerão aqui.</p>
                </div>
              ),
            },
          ]}
        />
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Cursos relacionados</h3>
          <CourseList courses={mockCourses.slice(1, 4)} />
        </div>
      </section>
      <Footer />
    </main>
  );
} 