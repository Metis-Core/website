export type UserRole = 'admin' | 'user';

export type FeedbackCategory = 'bug' | 'feature' | 'praise' | 'question' | 'other';
export type FeedbackStatus = 'new' | 'triaged' | 'in_progress' | 'closed';

export type ConsultationStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
export type ApplicationStatus = 'new' | 'reviewing' | 'interview' | 'offered' | 'rejected' | 'hired';
export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  organization: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  layer: string | null;
  title: string;
  subtitle: string | null;
  description: string;
  icon: string | null;
  color: string;
  capabilities: string[];
  industries: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  icon: string | null;
  color: string;
  features: string[];
  link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  category: FeedbackCategory;
  rating: number | null;
  message: string;
  status: FeedbackStatus;
  created_at: string;
}

export interface Consultation {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  sector: string | null;
  service_interest: string | null;
  message: string;
  preferred_date: string | null;
  status: ConsultationStatus;
  created_at: string;
}

export interface CareerPosition {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string;
  type: EmploymentType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  position_id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  cover_letter_url: string | null;
  status: ApplicationStatus;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  created_at: string;
}
