import { useState, useEffect } from 'react';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';
import { EnrollmentViewModel } from '@/viewmodels/enrollment/EnrollmentViewModel';
import { CourseModule, CourseModuleVideo } from '@/types/course';
import { Enrollment } from '@/types/enrollment';

interface UseCourseDetailOptions {
  courseId: string;
  moduleId?: string;
  autoLoad?: boolean;
}

interface CourseDetailData {
  id: string;
  title: string;
  institution: string;
  categoryName: string;
  students: number;
  modulesCount: number;
  duration: string;
  rating: number;
  reviews: number;
  status: string;
  description: string;
  videoUrl?: string;
  posterImage: string;
  thumbnail: string;
  level: string;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export const useCourseDetail = ({ courseId, moduleId, autoLoad = false }: UseCourseDetailOptions) => {
  const [courseData, setCourseData] = useState<CourseDetailData | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [moduleVideos, setModuleVideos] = useState<CourseModuleVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseData = async () => {
    if (!courseId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const course = await CourseViewModel.getInstance().getCourseById(courseId);

      // Usar a API route local em vez da URL HTTP direta
      const thumbnail = course.thumbnail && course.thumbnail !== '' 
        ? `/api/images/courses/thumbnail/${course.thumbnail}` 
        : '/images/curso.svg';
      
      // Transformar os dados da API para o formato esperado pelo componente
      const transformedData: CourseDetailData = {
        id: course.id,
        title: course.name,
        institution: course.institution,
        categoryName: course.categoryName,
        students: 0, // TODO: Implementar quando a API retornar
        modulesCount: course.modulesCount || 0,
        duration: course.hours,
        rating: course.rating || 0,
        reviews: 0, // TODO: Implementar quando a API retornar
        level: course.level,
        description: course.description,
        posterImage: course.image,
        thumbnail: thumbnail,
        progress: {
          completed: 0,
          total: course.modulesCount || 0,
          percentage: 0
        },
        status: 'Ativo'
      };
      
      setCourseData(transformedData);

      // Carregar módulos do curso
      await fetchCourseModules();

      // Verificar se o usuário está matriculado
        try {
          const enrollmentData = await EnrollmentViewModel.getInstance().checkEnrollment(courseId);
          setEnrollment(enrollmentData);
          
          // Se estiver matriculado, buscar progresso
          if (enrollmentData) {
            const progress = await CourseViewModel.getInstance().getCourseProgress(courseId);
            if (progress) {
              setCourseData(prev => prev ? {
                ...prev,
                progress: {
                  completed: progress.completedModules || 0,
                  total: progress.totalModules || course.modulesCount || 0,
                  percentage: progress.percentage || 0
                }
              } : null);
            }
          }
        } catch (enrollmentError) {
          console.log('Usuário não matriculado ou erro ao verificar matrícula:', enrollmentError);
        }
    } catch (err: any) {
      console.error('Erro ao carregar dados do curso:', err);
      setError(err.message || 'Erro ao carregar dados do curso');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseModules = async () => {
    console.log('fetchCourseModules');
    if (!courseId) return;
    
    try {
      const modulesResponse = await CourseViewModel.getInstance().listCourseModules(courseId);
      
      setModules(modulesResponse);
      let firstModuleId = modulesResponse.length > 0 ? modulesResponse[0].id : null;
      
      // Se há um moduleId específico, carregar os vídeos desse módulo
      if (moduleId) {
        await fetchModuleVideos(moduleId);
        return;
      }

      if (firstModuleId) {
        console.log('fetchModuleVideos', firstModuleId);
        await fetchModuleVideos(firstModuleId);
      }
    } catch (err: any) {
      console.error('Erro ao carregar módulos do curso:', err);
    }
  };

  const fetchModuleVideos = async (moduleId: string) => {
    console.log('fetchModuleVideos', moduleId);
    try {
      const videosResponse = await CourseViewModel.getInstance().listModuleVideos(moduleId);
      console.log('videosResponse', videosResponse);
      setModuleVideos(videosResponse);
      
      // Encontrar e definir o módulo atual
      const foundModule = modules.find(m => m.id === moduleId);
      if (foundModule) {
        setCurrentModule(foundModule);
      }
    } catch (err: any) {
      console.error('Erro ao carregar vídeos do módulo:', err);
    }
  };

  const enrollInCourse = async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      const enrollmentData = await EnrollmentViewModel.getInstance().createEnrollment({
        courseId
      });
      
      setEnrollment(enrollmentData.enrollment);
      
      // Atualizar dados do curso com informações de matrícula
      await fetchCourseData();
      
      return enrollmentData;
    } catch (err: any) {
      console.error('Erro ao matricular no curso:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      await CourseViewModel.getInstance().completeModule(moduleId);
      
      // Atualizar dados do curso após completar módulo
      await fetchCourseData();
      
      // Atualizar o status do módulo na lista local
      setModules(prev => prev.map(m => 
        m.id === moduleId 
          ? { ...m, completed: true }
          : m
      ));
    } catch (err: any) {
      console.error('Erro ao completar módulo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Carregar vídeos quando moduleId mudar
  useEffect(() => {
    if (moduleId && modules.length > 0) {
      fetchModuleVideos(moduleId);
    }
  }, [moduleId, modules]);

  useEffect(() => {
    if (autoLoad) {
      fetchCourseData();
    }
  }, [courseId, autoLoad]);

  return {
    courseData,
    enrollment,
    modules,
    currentModule,
    moduleVideos,
    loading,
    error,
    refetch: fetchCourseData,
    refetchModules: fetchCourseModules,
    refetchModuleVideos: fetchModuleVideos,
    enrollInCourse,
    completeModule
  };
};