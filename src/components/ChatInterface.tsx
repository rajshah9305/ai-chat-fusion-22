import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SettingsModal } from './SettingsModal';
import { useChat } from '@/hooks/useChat';

export function ChatInterface() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
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
  } = useChat();

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMenuClick={() => {}} // For future sidebar implementation
      />

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-primary font-bold text-xl">AI</div>
              </div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Chat Everywhere</h2>
              <p className="text-muted-foreground mb-4">
                Chat with multiple AI models from different providers in one place.
              </p>
              <p className="text-sm text-muted-foreground">
                Configure your API keys in settings to get started.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                <span className="ml-2">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        selectedProvider={selectedProvider}
        selectedModel={selectedModel}
        onProviderChange={changeProvider}
        onModelChange={setSelectedModel}
      />

      <SettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKeys={apiKeys}
        onSaveApiKey={saveApiKey}
        onRemoveApiKey={removeApiKey}
      />
    </div>
  );
}