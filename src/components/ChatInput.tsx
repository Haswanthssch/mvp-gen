
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-background">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here... (Enter to send, Shift+Enter for new line)"
        className="flex-1 min-h-[60px] max-h-[120px] resize-none"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || disabled}
        className="self-end"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
