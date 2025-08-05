import { HttpClient } from './http-client/http-client';
import { HttpService } from './http-client/http-client.service';
import { requestLogger, responseLogger } from './http-client/interceptors';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const client = new HttpClient(API_URL);

client.addRequestInterceptor(requestLogger);
client.addResponseInterceptor(responseLogger);

const apiService = new HttpService(client);

export class EnrollmentService {
  private static instance: EnrollmentService;

  private constructor() {}

  public static getInstance(): EnrollmentService {
    if (!EnrollmentService.instance) {
      EnrollmentService.instance = new EnrollmentService();
    }
    return EnrollmentService.instance;
  }

  public static async createEnrollment(enrollmentData: any, headers?: any): Promise<{ data: any, headers: Headers }> {
    try {
      return await apiService.post<any>('/enrollment', enrollmentData, headers);
    } catch (error) {
      throw error;
    }
  }
} 