
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
   * Cria uma nova matricula
   */
  async createEnrollment(enrollmentData: any): Promise<any> {
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

} 