
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectProgressProps {
  progress: number;
}

const ProjectProgress = ({ progress }: ProjectProgressProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Your idea is being enhanced by AI... This can take up to a minute.</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default ProjectProgress;
