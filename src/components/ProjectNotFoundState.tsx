
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProjectNotFoundState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <p className="text-lg text-muted-foreground mb-4">Project not found.</p>
      <Button onClick={() => navigate('/build/new')}>Create a New Project</Button>
    </div>
  );
};

export default ProjectNotFoundState;
