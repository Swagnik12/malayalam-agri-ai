export interface User {
  id: string;
  username: string;
  role: 'farmer' | 'officer' | 'admin';
}

export interface Query {
  id: string;
  userId: string;
  question: string;
  answer?: string;
  language: 'en' | 'ml';
  location?: string;
  cropType?: string;
  season?: string;
  confidence?: number;
  feedback?: 'positive' | 'negative';
  escalated?: boolean;
  status: 'pending' | 'answered' | 'escalated';
  createdAt: string;
}

export interface Language {
  code: 'en' | 'ml';
  name: string;
  nativeName: string;
}

export interface Translation {
  en: string;
  ml: string;
}