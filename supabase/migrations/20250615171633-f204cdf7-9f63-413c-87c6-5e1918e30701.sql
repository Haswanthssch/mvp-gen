
-- Create a table for project chat messages
CREATE TABLE public.project_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for the project_chats table
ALTER TABLE public.project_chats ENABLE ROW LEVEL SECURITY;

-- Add a policy to allow users to view chat messages for their own projects
CREATE POLICY "Users can view chat messages for their own projects"
  ON public.project_chats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_chats.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Add a policy to allow users to create chat messages for their own projects
CREATE POLICY "Users can create chat messages for their own projects"
  ON public.project_chats FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_chats.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Add a policy to allow users to update chat messages for their own projects
CREATE POLICY "Users can update chat messages for their own projects"
  ON public.project_chats FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_chats.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Add a policy to allow users to delete chat messages for their own projects
CREATE POLICY "Users can delete chat messages for their own projects"
  ON public.project_chats FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_chats.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Enable realtime for the project_chats table
ALTER TABLE public.project_chats REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.project_chats;
