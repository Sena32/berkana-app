import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { requestLogger, responseLogger } from './http-client/interceptors';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);

client.addRequestInterceptor(requestLogger);
client.addResponseInterceptor(responseLogger);

const apiService = new HttpService(client);

export interface UserCourseProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface UserCourse {
  id: string;
  courseId: string;
  userId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED';
  progress: UserCourseProgress;
  course: {
    id: string;
    name: string;
    institution: string;
    modules?: number;
    hours: string;
    rating?: number;
    isActive: boolean;
    thumbnail: string;
    image: string;
    description: string;
    level: 'GRATUITO' | 'PAGO';
  };
}

export interface ListUserCoursesResponse {
  courses: UserCourse[];
  total: number;
  pages: number;
  currentPage: number;
}

export class UserCourseService {
  private static instance: UserCourseService;

  private constructor() {}

  public static getInstance(): UserCourseService {
    if (!UserCourseService.instance) {
      UserCourseService.instance = new UserCourseService();
    }
    return UserCourseService.instance;
  }

  public static async getUserCourses(page: number = 1, status?: string, headers?: any): Promise<{ data: ListUserCoursesResponse, headers: Headers }> {
    try {
      const params: any = { page };
      if (status) params.status = status;
      return await apiService.get<ListUserCoursesResponse>('/user/courses', params, headers);
    } catch (error) {
      console.log('getUserCourses Error: ', error);
      throw error;
    }
  }

  public static async getRecommendedCourses(page: number = 1, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      const params: any = { page };
      return await apiService.get<any>('/course/recommended', params, headers);
    } catch (error) {
      console.log('getRecommendedCourses Error: ', error);
      throw error;
    }
  }
} 