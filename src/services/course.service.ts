import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { requestLogger, responseLogger } from './http-client/interceptors';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);

client.addRequestInterceptor(requestLogger);
client.addResponseInterceptor(responseLogger);

const apiService = new HttpService(client);

export class CourseService {
  private static instance: CourseService;

  private constructor() {}

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

  public static async listPublicCourses(page: number = 1, name?: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      const params: any = { page };
      if (name) params.name = name;
      return await apiService.get<any>('/course', params, headers);
    } catch (error) {
      console.log('listPublicCourses Error: ', error);
      throw error;
    }
  }

  public static async listCourses(page: number = 1, name?: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      const params: any = { page };
      if (name) params.name = name;
      return await apiService.get<any>('/course', params, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async getCourseById(id: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>(`/course/${id}`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async listCourseModules(courseId: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>(`/student/courses/${courseId}/modules`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async listModuleVideos(moduleId: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>(`/student/courses/modules/${moduleId}/videos`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async completeModule(moduleId: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>(`/module-progress/modules/${moduleId}/complete`, {}, headers);
    } catch (error) {
      throw error;
    }
  }
} 