import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { authInterceptor, requestLogger, responseLogger } from './http-client/interceptors';
// import { CreateUserDto, ListUsersResponse, User, FirstAccessPasswordDto } from '@/types/user'; // Definir tipos no próximo módulo

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);
// Interceptors podem ser ativados conforme integração real
// client.addRequestInterceptor(authInterceptor);
// client.addRequestInterceptor(requestLogger);
// client.addResponseInterceptor(responseLogger);

const apiService = new HttpService(client);

export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public static async listUsers(page: number, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>('/user', { page }, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async getUserById(id: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>(`/user/${id}`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async createUser(userData: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>('/user', userData, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async uploadAvatar(id: string, file: File, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await apiService.post<any>(`/user/${id}/avatar`, formData, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async adminGeneratePassword(id: string, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>(`/user/${id}/generate-password`, {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async editUser(id: string, userData: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.patch<any>(`/user/${id}`, userData, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async firstAccessPassword(data: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.patch<any>('/user/first-access-password', data, headers);
    } catch (error) {
      throw error;
    }
  }
} 