
import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ProjectLoadingState from "@/components/ProjectLoadingState";
import ProjectErrorState from "@/components/ProjectErrorState";
import ProjectNotFoundState from "@/components/ProjectNotFoundState";
import ProjectContent from "@/components/ProjectContent";
import { useProgressTimer } from "@/hooks/useProgressTimer";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchProject = useCallback(async () => {
    if (!projectId) return null;
    
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }, [projectId]);

  const { 
    data: project, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: fetchProject,
    enabled: !!projectId,
    refetchOnWindowFocus: false,
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const { progress } = useProgressTimer({
    isActive: project?.status === 'processing',
    initialProgress: 10,
    increment: 2,
    interval: 1000,
    maxProgress: 95
  });

  // Set up real-time subscription for project updates
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

  // Handle navigation for invalid project ID
  useEffect(() => {
    if (!projectId) {
      navigate('/build/new');
    }
  }, [projectId, navigate]);

  const renderContent = () => {
    if (isLoading) {
      return <ProjectLoadingState />;
    }
    
    if (error) {
      return <ProjectErrorState error={error} />;
    }

    if (!project) {
      return <ProjectNotFoundState />;
    }

    return <ProjectContent project={project} progress={progress} />;
  };

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
