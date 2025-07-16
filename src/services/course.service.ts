import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { authInterceptor, requestLogger, responseLogger } from './http-client/interceptors';
// import { CreateCourseDto, UpdateCourseDto, Course, ListCoursesResponse } from '@/types/course'; // Definir tipos no próximo módulo

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);
// Interceptors podem ser ativados conforme integração real
// client.addRequestInterceptor(authInterceptor);
// client.addRequestInterceptor(requestLogger);
// client.addResponseInterceptor(responseLogger);

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

  public static async listCourses(page: number = 1, name?: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      const params: any = { page };
      if (name) params.name = name;
      return await apiService.get<any>('/courses', params, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async getCourseById(id: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>(`/courses/${id}`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async createCourse(data: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>('/courses', data, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async updateCourse(id: string, data: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.patch<any>(`/courses/${id}`, data, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async deleteCourse(id: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.delete<any>(`/courses/${id}`, headers);
    } catch (error) {
      throw error;
    }
  }
} 