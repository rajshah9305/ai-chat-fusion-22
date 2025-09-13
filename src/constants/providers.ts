import { AIProvider } from "@/types/chat";

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo', 'gpt-4-turbo'],
    apiKeyRequired: true,
    baseUrl: 'https://api.openai.com/v1'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    apiKeyRequired: true,
    baseUrl: 'https://api.anthropic.com'
  },
  {
    id: 'google',
    name: 'Google AI',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    apiKeyRequired: true,
    baseUrl: 'https://generativelanguage.googleapis.com'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    models: ['command-r-plus', 'command-r', 'command'],
    apiKeyRequired: true,
    baseUrl: 'https://api.cohere.ai'
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    models: ['llama3.1-8b', 'llama3.1-70b'],
    apiKeyRequired: true,
    baseUrl: 'https://api.cerebras.ai'
  },
  {
    id: 'groq',
    name: 'Groq',
    models: ['llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'],
    apiKeyRequired: true,
    baseUrl: 'https://api.groq.com'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    models: ['llama-3.1-sonar-small-128k-online', 'llama-3.1-sonar-large-128k-online'],
    apiKeyRequired: true,
    baseUrl: 'https://api.perplexity.ai'
  }
];

export const DEFAULT_PROVIDER = 'openai';
export const DEFAULT_MODEL = 'gpt-4o-mini';