
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchProject = async () => {
    if (!projectId) return null;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  const { data: project, isLoading, error, refetch } = useQuery({
    queryKey: ['project', projectId],
    queryFn: fetchProject,
    enabled: !!projectId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!projectId) return;

    const channel = supabase.channel(`project-${projectId}`)
      .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Loading your project...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-destructive/10 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-lg text-destructive mb-4">Error loading project: {error.message}</p>
          <Button onClick={() => navigate('/build/new')}>Create a New Project</Button>
        </div>
      );
    }

    if (!project) {
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <p className="text-lg text-muted-foreground mb-4">Project not found.</p>
            <Button onClick={() => navigate('/build/new')}>Create a New Project</Button>
          </div>
        );
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="text-primary" />
              Original Idea
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.original_idea}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="text-primary" />
              AI Enhanced Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.status === 'processing' && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Your idea is being enhanced by AI...</span>
              </div>
            )}
            {project.status === 'completed' && (
              <p className="text-muted-foreground whitespace-pre-wrap">{project.enhanced_prompt}</p>
            )}
             {project.status === 'failed' && (
              <div className="flex items-center gap-3 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 pt-28 max-w-4xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default ProjectDetails;
