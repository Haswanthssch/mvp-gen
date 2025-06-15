
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  created_at: string;
}

interface ProjectChatProps {
  projectId: string;
}

const ProjectChat = ({ projectId }: ProjectChatProps) => {
  const queryClient = useQueryClient();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['project-chats', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_chats')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!projectId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const { error } = await supabase
        .from('project_chats')
        .insert({
          project_id: projectId,
          sender: 'user',
          message: message,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-chats', projectId] });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isAtBottom && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isAtBottom]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel(`project-chat-${projectId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'project_chats',
        filter: `project_id=eq.${projectId}`,
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['project-chats', projectId] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);

  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 10;
    setIsAtBottom(isAtBottom);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading conversation...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-background">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold text-lg">Project Conversation</h3>
        <p className="text-sm text-muted-foreground">
          {messages.length === 0 ? "Start a conversation about your project" : `${messages.length} messages`}
        </p>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1" onScrollCapture={handleScroll}>
        <div className="space-y-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                sender={message.sender}
                message={message.message}
                timestamp={message.created_at}
              />
            ))
          )}
        </div>
      </ScrollArea>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
};

export default ProjectChat;
