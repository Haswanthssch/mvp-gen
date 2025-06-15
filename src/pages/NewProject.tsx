
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const NewProject = () => {
  const [idea, setIdea] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [idea]);

  const handleSubmit = () => {
    console.log("Submitted idea:", idea);
    // Here you would typically send the idea to your backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-28">
        <div className="w-full max-w-2xl flex flex-col flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            Describe your startup idea
          </h1>

          <div className="flex-grow space-y-4 mb-8">
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-md border shadow-sm">
                <p className="text-sm text-gray-600">For example: "A marketplace for local artists to sell their work directly to consumers."</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-md border shadow-sm">
                <p className="text-sm text-gray-600">Or: "An app that uses AI to create personalized meal plans based on dietary restrictions and preferences."</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pb-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={idea}
                onChange={handleTextareaChange}
                placeholder="I want to build a platform where dog owners can book certified trainers nearby..."
                className="w-full p-4 pr-16 rounded-xl shadow-sm resize-none overflow-hidden text-base"
                rows={1}
              />
              <Button
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg"
                onClick={handleSubmit}
                disabled={!idea.trim()}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewProject;
