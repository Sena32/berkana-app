import { UserCourseService, ListUserCoursesResponse } from '@/services/user-course.service';

export class UserCourseViewModel {
  private static instance: UserCourseViewModel;

  private constructor() {}

  public static getInstance(): UserCourseViewModel {
    if (!UserCourseViewModel.instance) {
      UserCourseViewModel.instance = new UserCourseViewModel();
    }
    return UserCourseViewModel.instance;
  }

  async getUserCourses(page: number = 1, status?: string): Promise<ListUserCoursesResponse> {
    try {
      const token = null;
      if (!token) {
        throw new Error('Token de acesso não encontrado');
      }

      const { data } = await UserCourseService.getUserCourses(page, status, { Authorization: `Bearer ${token}` });
      return data;
    } catch (error: any) {
      console.log('getUserCourses Error: ', error);
      throw new Error(error.message || 'Erro ao buscar cursos do usuário');
    }
  }

  async getRecommendedCourses(page: number = 1): Promise<any> {
    try {
      const token = null;
      if (!token) {
        throw new Error('Token de acesso não encontrado');
      }

      const { data } = await UserCourseService.getRecommendedCourses(page, { Authorization: `Bearer ${token}` });
      return data;
    } catch (error: any) {
      console.log('getRecommendedCourses Error: ', error);
      throw new Error(error.message || 'Erro ao buscar cursos recomendados');
    }
  }
} 