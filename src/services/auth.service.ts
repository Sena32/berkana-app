import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { authInterceptor, requestLogger, responseLogger } from './http-client/interceptors';
// import { AuthResponse, LoginCredentials } from '@/types/auth'; // Definir tipos no próximo módulo

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);
// Interceptors podem ser ativados conforme integração real
// client.addRequestInterceptor(authInterceptor);
// client.addRequestInterceptor(requestLogger);
// client.addResponseInterceptor(responseLogger);

const apiService = new HttpService(client);

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Tipos temporários para evitar erro de compilação
  public static async signin(credentials: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>('/auth/signin', credentials, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async logout(headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>('/auth/logout', {}, headers);
    } catch (error) {
      throw error;
    }
  }

  public static async refresh(headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.get<any>('/auth/refresh', {}, headers);
    } catch (error) {
      throw error;
    }
  }
} 