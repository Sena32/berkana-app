import CourseModulesSidebar from '@/components/course/CourseModulesSidebar';
import CoursePlayer from '@/components/course/CoursePlayer';
import Tabs from '@/components/common/Tabs';
import CourseProgram, { CourseModule } from '@/components/course/CourseProgram';
import Footer from '@/components/layout/Footer';

const modules = [
  { title: 'Introdução', status: 'concluído' as const, duration: '10:00' },
  { title: 'Módulo 1 - Lorem ipsum', status: 'atual' as const, duration: '10:00' },
  { title: 'Módulo 2 - Lorem ipsum', status: 'pendente' as const, duration: '10:00' },
  { title: 'Teste de conhecimento', status: 'pendente' as const, duration: '30:00' },
  { title: 'Módulo 3 - Lorem ipsum', status: 'pendente' as const, duration: '30:00' },
  { title: 'Teste final', status: 'pendente' as const, duration: '15:00' },
];

const program: CourseModule[] = [
  { title: 'Medidas de Correção', description: 'Prevenção e Repressão dos Desvios de Conduta.', duration: '10:00' },
  { title: 'Estrutura Correcional', description: 'Prevenção ao Desvio de Conduta.', duration: '10:00' },
  { title: 'Imagem Institucional', description: 'Consequências práticas e jurídicas.', duration: '10:00' },
];

export const metadata = {
  title: 'Detalhe do Curso | Berkana Academy',
  description: 'Acompanhe seu progresso e acesse o conteúdo do curso.',
};

export default function StudentCourseDetailPage() {
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-72 w-full">
          <CourseModulesSidebar modules={modules} current={1} />
        </div>
        <div className="flex-1 flex flex-col">
          <CoursePlayer videoUrl="" poster="/images/brand/hero-woman.png" title="Aula 1" />
          <Tabs
            tabs={[
              {
                label: 'Visão geral',
                content: (
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Descrição</h3>
                    <p className="text-text-secondary mb-6">Capacitar os profissionais do Sistema Único de Segurança Pública - SUSP, no tocante à compreensão da gestão de pessoal e o papel das corregedorias nas instituições de segurança pública no combate à corrupção.</p>
                  </div>
                ),
              },
              {
                label: 'Conteúdo',
                content: <CourseProgram modules={program} />,
              },
              {
                label: 'Material complementar',
                content: (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <span className="text-2xl mb-2">📄</span>
                      <span className="font-semibold">Artigo científico</span>
                      <a href="#" className="text-primary text-sm mt-2 hover:underline">Download</a>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <span className="text-2xl mb-2">📊</span>
                      <span className="font-semibold">Gestão de Riscos</span>
                      <a href="#" className="text-primary text-sm mt-2 hover:underline">Planilha de Excel</a>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <span className="text-2xl mb-2">🎥</span>
                      <span className="font-semibold">Entrevista com José João</span>
                      <a href="#" className="text-primary text-sm mt-2 hover:underline">Vídeo</a>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                      <span className="text-2xl mb-2">🔗</span>
                      <span className="font-semibold">Lorem ipsum dolor</span>
                      <a href="#" className="text-primary text-sm mt-2 hover:underline">Link externo</a>
                    </div>
                  </div>
                ),
              },
              {
                label: 'Certificado',
                content: (
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Certificado de conclusão</h3>
                    <p className="text-text-secondary">O certificado de conclusão deste curso é emitido por SENASP.</p>
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
        </div>
      </div>
      <Footer />
    </main>
  );
} 