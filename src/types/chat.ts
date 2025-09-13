export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  tokens?: number;
  responseTime?: number;
}

export interface AIProvider {
  id: string;
  name: string;
  models: string[];
  apiKeyRequired: boolean;
  baseUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  provider: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  provider: string;
  key: string;
  isValid?: boolean;
}