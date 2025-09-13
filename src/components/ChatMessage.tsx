import { Message } from "@/types/chat";
import { User, Bot, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg",
      isUser 
        ? "bg-chat-user text-chat-user-foreground ml-12" 
        : "bg-chat-assistant text-chat-assistant-foreground mr-12"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-background/20" : "bg-foreground/10"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isUser ? 'You' : 'Assistant'}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {message.responseTime && (
          <div className="flex items-center gap-2 text-xs opacity-75">
            <Clock className="w-3 h-3" />
            <span className="bg-performance text-performance-foreground px-2 py-1 rounded font-medium">
              RESPONDED IN {message.responseTime}S
            </span>
            {message.tokens && (
              <span className="text-muted-foreground">
                ({message.tokens} TOKENS/SEC)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}