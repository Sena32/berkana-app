export enum CourseLevel {
  GRATUITO = 'GRATUITO',
  PAGO = 'PAGO',
}

export interface Instructor {
  id: string;
  name: string;
  email?: string;
  lastName?: string;
  cpf?: string;
  institution?: string;
  profile?: string;
  avatar?: string;
  isActive?: boolean;
}


export interface Category {
  id: string;
  name: string;
}

export interface Institution {
  id: string;
  name: string;
}

export type Course = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  image: string;
  institutionId: string;
  categoryId: string;
  unitCertification: string;
  level: CourseLevel;
  slug: string;
  hours: string;
  price: string;
  instructorId: string;
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  category: Category;
  institution: Institution;
  modulesCount: number;
  rating?: number;
  reviews?: number;
};

export interface ListCoursesResponse {
  courses: Course[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface ListCourseModulesResponse {
  modules: CourseModule[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface ListCourseModuleVideosResponse {
  videos: CourseModuleVideo[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface CourseModule {
  id: string,
  title: string,
  order: number,
  locked: boolean,
  completed: boolean
}

export interface CourseModuleVideo {
  id: string,
  name: string,
  description: string,
  link: string,
  order: number
}