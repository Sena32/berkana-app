import { CourseService } from '@/services/course.service';
import { Course, ListCoursesResponse } from '@/types/course';

export class CourseViewModel {
  private static instance: CourseViewModel;

  private constructor() {}

  public static getInstance(): CourseViewModel {
    if (!CourseViewModel.instance) {
      CourseViewModel.instance = new CourseViewModel();
    }
    return CourseViewModel.instance;
  }

  // async listPublicCourses(page: number = 1, name?: string): Promise<ListCoursesResponse> {
  //   try {
  //     const { data } = await CourseService.listPublicCourses(page, name);
  //     return data;
  //   } catch (error: any) {
  //     console.log('listPublicCourses Error: ', error);
  //     throw new Error(error.message || 'Erro ao listar cursos');
  //   }
  // }

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
async getCourseById(id: string): Promise<Course> {
  try {
    const response = await fetch(`/api/course/${id}`);
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
     * Lista modulos do curso
     */
  async listCourseModules(courseId: string): Promise<ListCoursesResponse> {
    try {
      let url = `/api/student/courses/${courseId}/modules`;
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error: any) {
      console.log('listCourseModules Error: ', error);
      throw new Error(error.message || 'Erro ao listar modulos do curso');
    }
  }

  /**
     * Lista videos do modulo
     */
  async listModuleVideos(moduleId: string): Promise<ListCoursesResponse> {
    try {
      let url = `/api/student/courses/modules/${moduleId}/videos`;
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error: any) {
      console.log('listModuleVideos Error: ', error);
      throw new Error(error.message || 'Erro ao listar videos do modulo');
    }
  }

  async completeModule(moduleId: string): Promise<any> {
    try {
      const response = await fetch(`/api/module-progress/modules/${moduleId}/complete`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao completar modulo');
    }
  }

} 