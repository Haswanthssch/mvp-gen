
import { Loader2 } from "lucide-react";

const ProjectLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Loading your project...</p>
    </div>
  );
};

export default ProjectLoadingState;
