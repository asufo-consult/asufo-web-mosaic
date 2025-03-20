
export type NewsletterSubscriber = {
  id: string;
  email: string;
  name: string | null;
  language: string;
  created_at: string;
  active: boolean;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
  language: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  language: string;
};

export type ProjectFact = {
  id: string;
  project_id: string;
  fact: string;
  language: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  language: string;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  language: string;
};
