import { useRouter } from 'next/navigation';
import { NavigationConfig } from '@/components/course/CourseList';

interface UseCourseNavigationOptions {
  baseUrl?: string;
  useRouter?: boolean;
  onNavigate?: (id: string) => void;
}

export const useCourseNavigation = (options: UseCourseNavigationOptions = {}): NavigationConfig => {
  const router = useRouter();

  const handleClick = (id: string) => {
    if (options.onNavigate) {
      options.onNavigate(id);
      return;
    }

    if (options.useRouter) {
      const url = options.baseUrl ? `${options.baseUrl}/${id}` : `/aluno/cursos/${id}`;
      router.push(url);
      return;
    }
  };

  return {
    enabled: true,
    baseUrl: options.baseUrl,
    useRouter: options.useRouter,
    onClick: handleClick,
  };
}; 