
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate("/auth");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered MVP Generation
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Build Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MVP
            </span>{" "}
            in Minutes
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed">
            Transform your ideas into functional prototypes with our AI-powered platform. 
            No coding required, just describe your vision and watch it come to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold" onClick={handleStartBuilding}>
              Start Building Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ entrepreneurs</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TechCrunch</div>
              <div className="text-2xl font-bold text-gray-400">Forbes</div>
              <div className="text-2xl font-bold text-gray-400">Wired</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
