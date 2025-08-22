import { CourseService } from '@/services/course.service';
import { Course, ListCoursesResponse, ListCourseModulesResponse, ListCourseModuleVideosResponse, CourseModule, CourseModuleVideo } from '@/types/course';

export class CourseViewModel {
  private static instance: CourseViewModel;

  private constructor() {}

  public static getInstance(): CourseViewModel {
    if (!CourseViewModel.instance) {
      CourseViewModel.instance = new CourseViewModel();
    }
    return CourseViewModel.instance;
  }
  private baseUrl = process.env.NEXT_PUBLIC_INTERNAL_API_URL;

  async listHomeCourses(page: number = 1, name?: string): Promise<ListCoursesResponse> {
    try {
      const { data } = await CourseService.listPublicCourses(page, name);
      return data;
    } catch (error: any) {
      console.log('listPublicCourses Error: ', error);
      throw new Error(error.message || 'Erro ao listar cursos');
    }
  }

 /**
   * Lista cursos com paginação
   */
 async listPublicCourses(page: number = 1, name?: string): Promise<ListCoursesResponse> {
  try {
    let url = `/api/course?page=${page}`;
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    const response = await fetch(url, {
      headers: {
        'method': 'GET',
        'isPublic': 'true',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  } catch (error: any) {
    console.log('listCourses Error: ', error);
    throw new Error(error.message || 'Erro ao listar cursos');
  }
}

/**
 * Busca curso por ID
 */
async getCourseById(id: string, isPublic: boolean = false): Promise<Course> {
  try {
    const response = await fetch(`/api/course/${id}`, {
      headers: {
        'isPublic': isPublic ? 'true' : 'false',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar curso');
  }
}

  /**
     * Lista módulos do curso
     */
  async listCourseModules(courseId: string, isPublic: boolean = false): Promise<CourseModule[]> {
    try {
      const response = await fetch(`/api/course/${courseId}/modules`, {
        headers: {
          'isPublic': isPublic ? 'true' : 'false',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      console.log('listCourseModules Error: ', error);
      throw new Error(error.message || 'Erro ao listar módulos do curso');
    }
  }

  /**
   * Lista vídeos do módulo
   */
  async listModuleVideos(moduleId: string, isPublic: boolean = false): Promise<CourseModuleVideo[]> {
    try {
      const response = await fetch(`/api/course/${moduleId}/videos`, {
        headers: {
          'isPublic': isPublic ? 'true' : 'false'
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      console.log('listModuleVideos Error: ', error);
      throw new Error(error.message || 'Erro ao listar vídeos do módulo');
    }
  }

  /**
   * Marca módulo como completo
   */
  async completeModule(moduleId: string): Promise<any> {
    try {
      const response = await fetch(`/api/course/${moduleId}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao completar módulo');
    }
  }

  /**
   * Obtém o progresso do usuário no curso
   */
  async getCourseProgress(courseId: string): Promise<any> {
    try {
      const response = await fetch(`/api/course/${courseId}/progress`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao obter progresso do curso');
    }
  }

  /**
   * Mock: Lista módulos do curso com delay simulado
   */
  async listCourseModulesMock(courseId: string, isPublic: boolean = false): Promise<CourseModule[]> {
    // Simula delay de rede realista (300-800ms)
    const delay = Math.random() * 500 + 300;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockModules: CourseModule[] = [
          {
            id: '1',
            title: 'Introdução ao Curso',
            order: 1,
            locked: false,
            completed: false
          },
          {
            id: '2',
            title: 'Fundamentos Teóricos',
            order: 2,
            locked: false,
            completed: false
          },
          {
            id: '3',
            title: 'Aplicação Prática',
            order: 3,
            locked: false,
            completed: false
          }
        ];
        
        resolve(mockModules);
      }, delay);
    });
  }

  /**
   * Mock: Lista vídeos do módulo com delay simulado
   */
  async listModuleVideosMock(moduleId: string, isPublic: boolean = false): Promise<CourseModuleVideo[]> {
    // Simula delay de rede realista (200-600ms)
    const delay = Math.random() * 400 + 200;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockVideos: CourseModuleVideo[] = [
          {
            id: '1',
            name: 'Vídeo 1: Conceitos Iniciais',
            description: 'Primeira parte da explicação',
            link: 'https://vimeo.com/76979871',
            order: 1
          },
          {
            id: '2',
            name: 'Vídeo 2: Exemplos Práticos',
            description: 'Demonstração de conceitos',
            link: 'https://vimeo.com/76979871',
            order: 2
          },
          {
            id: '3',
            name: 'Vídeo 3: Exercícios',
            description: 'Atividades práticas para fixação',
            link: 'https://vimeo.com/76979871',
            order: 3
          }
        ];
        
        resolve(mockVideos);
      }, delay);
    });
  }
} 
