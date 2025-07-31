export interface Event {
  id: string;
  title: string;
  description: string;
  provider: string;
  date: string;
  time: string;
  status: string;
  institution: string;
  link?: string;
}

export interface EventListProps {
  events: Event[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  showExploreButton?: boolean;
  exploreButtonLink?: string;
  className?: string;
} 