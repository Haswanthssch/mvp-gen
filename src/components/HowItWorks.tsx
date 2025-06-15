
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Zap, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Idea",
      description: "Simply tell our AI what you want to build. Describe your vision, target audience, and key features.",
      step: "01"
    },
    {
      icon: Zap,
      title: "AI Generates Your MVP",
      description: "Our advanced AI analyzes your requirements and generates a fully functional MVP with modern design.",
      step: "02"
    },
    {
      icon: Rocket,
      title: "Launch & Iterate",
      description: "Deploy your MVP instantly and gather user feedback. Make improvements with AI assistance.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to transform your idea into a working MVP
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
