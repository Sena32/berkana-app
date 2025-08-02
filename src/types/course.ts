export enum CourseLevel {
  GRATUITO = 'GRATUITO',
  PAGO = 'PAGO',
}

export type Course = {
  id: string;
  name: string;
  institution: string;
  modules?: number;
  hours: string;
  rating?: number;
  isActive: boolean;
  isPublic: boolean;
  thumbnail: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  level: CourseLevel;
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