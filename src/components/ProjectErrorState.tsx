
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProjectErrorStateProps {
  error: Error | null;
}

const ProjectErrorState = ({ error }: ProjectErrorStateProps) => {
  const navigate = useNavigate();
  
  const errorMessage = error?.message || "An unexpected error occurred";

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-destructive/10 rounded-lg">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <p className="text-lg text-destructive mb-4">Error loading project: {errorMessage}</p>
      <Button onClick={() => navigate('/build/new')}>Create a New Project</Button>
    </div>
  );
};

export default ProjectErrorState;
