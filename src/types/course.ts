export type Course = {
  id: string;
  title: string;
  institution: string;
  modules: number;
  duration: string;
  rating: number;
  status: 'in-progress' | 'open' | 'completed';
  image: string;
  description: string;
}; 