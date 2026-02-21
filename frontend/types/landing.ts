export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconColor: string;
  borderHoverColor: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
}
