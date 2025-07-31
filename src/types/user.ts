export enum UserProfile {
  ADMIN = "ADMIN",
  GESTOR = "GESTOR",
  INSTRUTOR = "INSTRUTOR",
  ALUNO = "ALUNO"
}

export interface CreateUserDto {
    email: string;
    name: string;
    lastName: string;
    institution: string;
    avatar?: string | null;
    profile: UserProfile;
    cpf: string;
}
  
  
export interface ListUsersResponse {
  users: User[]; // Assuming "string" in doc example means the User object representation
  total: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
  
// Assuming the user object returned by GET /user/{id} and POST /user is similar to CreateUserDto, potentially with an ID
export interface User extends CreateUserDto {
  id: string; // Assuming an ID field exists
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
  
export interface FirstAccessPasswordDto {
  email: string;
  password: string;
  confirmPassword: string;
}
  
// You might need more specific types for editing (PATCH), admin password reset, etc.
// For simplicity, using 'any' or 'Partial<CreateUserDto>' might be necessary initially.