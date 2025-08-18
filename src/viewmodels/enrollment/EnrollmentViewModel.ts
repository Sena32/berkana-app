import { CreateEnrollmentDto, Enrollment, EnrollmentResponse } from '@/types/enrollment';

export class EnrollmentViewModel {
  private static instance: EnrollmentViewModel;

  private constructor() {}

  public static getInstance(): EnrollmentViewModel {
    if (!EnrollmentViewModel.instance) {
      EnrollmentViewModel.instance = new EnrollmentViewModel();
    }
    return EnrollmentViewModel.instance;
  }

  /**
   * Cria uma nova matrícula
   */
  async createEnrollment(enrollmentData: CreateEnrollmentDto): Promise<EnrollmentResponse> {
    try {
      const response = await fetch('/api/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar matrícula');
    }
  }

  /**
   * Verifica se o usuário está matriculado em um curso
   */
  async checkEnrollment(courseId: string): Promise<Enrollment | null> {
    try {
      const response = await fetch(`/api/enrollment/${courseId}/check`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Usuário não matriculado
        }
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao verificar matrícula');
    }
  }

  /**
   * Obtém o progresso da matrícula
   */
  async getEnrollmentProgress(courseId: string): Promise<Enrollment | null> {
    try {
      const response = await fetch(`/api/enrollment/${courseId}/progress`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao obter progresso da matrícula');
    }
  }
} 