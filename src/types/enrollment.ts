export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  enrolledAt: string;
  completedAt?: string;
  progress: {
    completedModules: number;
    totalModules: number;
    percentage: number;
  };
}

export interface CreateEnrollmentDto {
  courseId: string;
  userId?: string; // Opcional, pode ser extraído do token
}

export interface EnrollmentResponse {
  enrollment: Enrollment;
  message: string;
} 