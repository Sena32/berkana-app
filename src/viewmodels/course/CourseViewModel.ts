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
} 
