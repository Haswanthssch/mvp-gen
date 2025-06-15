
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, AlertTriangle } from "lucide-react";
import ProjectProgress from "./ProjectProgress";

interface Project {
  id: string;
  original_idea: string;
  enhanced_prompt?: string;
  status: string;
}

interface ProjectContentProps {
  project: Project;
  progress: number;
}

const ProjectContent = ({ project, progress }: ProjectContentProps) => {
  const renderEnhancedPromptContent = () => {
    switch (project.status) {
      case 'processing':
        return <ProjectProgress progress={progress} />;
      case 'completed':
        return (
          <p className="text-muted-foreground whitespace-pre-wrap">
            {project.enhanced_prompt}
          </p>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span>Something went wrong. Please try again.</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-3 text-muted-foreground">
            <span>Processing status unknown.</span>
          </div>
        );
    }
  };

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
          {renderEnhancedPromptContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectContent;
