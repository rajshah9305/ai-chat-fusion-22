import { useState, useCallback } from 'react';
import { Message, ChatSession, APIKey } from '@/types/chat';
import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_PROVIDER, DEFAULT_MODEL, AI_PROVIDERS } from '@/constants/providers';
import { toast } from '@/hooks/use-toast';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useLocalStorage('selectedProvider', DEFAULT_PROVIDER);
  const [selectedModel, setSelectedModel] = useLocalStorage('selectedModel', DEFAULT_MODEL);
  const [apiKeys, setApiKeys] = useLocalStorage<APIKey[]>('apiKeys', []);

  const saveApiKey = useCallback((provider: string, key: string) => {
    setApiKeys(current => {
      const updated = current.filter(k => k.provider !== provider);
      return [...updated, { provider, key, isValid: true }];
    });
    toast({
      title: "API Key Saved",
      description: `API key for ${AI_PROVIDERS.find(p => p.id === provider)?.name} has been saved.`,
    });
  }, [setApiKeys]);

  const removeApiKey = useCallback((provider: string) => {
    setApiKeys(current => current.filter(k => k.provider !== provider));
    toast({
      title: "API Key Removed",
      description: `API key for ${AI_PROVIDERS.find(p => p.id === provider)?.name} has been removed.`,
    });
  }, [setApiKeys]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiKey = apiKeys.find(k => k.provider === selectedProvider);
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: `Please add an API key for ${AI_PROVIDERS.find(p => p.id === selectedProvider)?.name} in settings.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const startTime = Date.now();
      
      // Simulate API call for demo purposes
      // In a real implementation, you would make actual API calls to the providers
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const endTime = Date.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(2);
      const tokens = Math.floor(Math.random() * 2000) + 500;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from ${AI_PROVIDERS.find(p => p.id === selectedProvider)?.name} using the ${selectedModel} model. In a real implementation, this would be the actual AI response to: "${content}"

The response would be generated based on the selected provider and model, using the configured API key to make the actual API call.`,
        role: 'assistant',
        timestamp: new Date(),
        responseTime: parseFloat(responseTime),
        tokens: Math.floor(tokens / parseFloat(responseTime)),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedProvider, selectedModel, apiKeys]);

  const changeProvider = useCallback((provider: string) => {
    setSelectedProvider(provider);
    // Update model to the first available model for the new provider
    const providerData = AI_PROVIDERS.find(p => p.id === provider);
    if (providerData && providerData.models.length > 0) {
      setSelectedModel(providerData.models[0]);
    }
  }, [setSelectedProvider, setSelectedModel]);

  return {
    messages,
    isLoading,
    selectedProvider,
    selectedModel,
    apiKeys,
    sendMessage,
    changeProvider,
    setSelectedModel,
    saveApiKey,
    removeApiKey,
  };
}