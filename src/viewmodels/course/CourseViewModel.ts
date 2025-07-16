import { CourseService } from '@/services/course.service';

export class CourseViewModel {
  private static instance: CourseViewModel;

  private constructor() {}

  public static getInstance(): CourseViewModel {
    if (!CourseViewModel.instance) {
      CourseViewModel.instance = new CourseViewModel();
    }
    return CourseViewModel.instance;
  }

  async listCourses(page: number = 1, name?: string): Promise<any> {
    try {
      const { data } = await CourseService.listCourses(page, name);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao listar cursos');
    }
  }

  async getCourseById(id: string): Promise<any> {
    try {
      const { data } = await CourseService.getCourseById(id);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar curso');
    }
  }

  async createCourse(courseData: any): Promise<any> {
    try {
      const { data } = await CourseService.createCourse(courseData);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar curso');
    }
  }

  async editCourse(id: string, courseData: any): Promise<any> {
    try {
      const { data } = await CourseService.updateCourse(id, courseData);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao editar curso');
    }
  }

  async deleteCourse(id: string): Promise<void> {
    try {
      await CourseService.deleteCourse(id);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao deletar curso');
    }
  }
} 