
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

const ChatMessage = ({ sender, message, timestamp }: ChatMessageProps) => {
  const isUser = sender === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[70%] rounded-lg px-4 py-2",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-muted-foreground"
      )}>
        <p className="whitespace-pre-wrap break-words">{message}</p>
        <p className={cn(
          "text-xs mt-1 opacity-70",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
        )}>
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
