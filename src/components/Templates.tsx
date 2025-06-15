
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Templates = () => {
  const templates = [
    {
      title: "E-commerce Store",
      description: "Complete online store with product catalog, shopping cart, and payment integration",
      tags: ["React", "Stripe", "Tailwind"],
      image: "🛍️"
    },
    {
      title: "SaaS Dashboard",
      description: "Modern dashboard with analytics, user management, and subscription billing",
      tags: ["Next.js", "Charts", "Auth"],
      image: "📊"
    },
    {
      title: "Social Platform",
      description: "Community platform with user profiles, posts, comments, and real-time chat",
      tags: ["React", "Socket.io", "Database"],
      image: "👥"
    },
    {
      title: "Landing Page",
      description: "High-converting landing page with lead capture and email integration",
      tags: ["HTML", "CSS", "Forms"],
      image: "🚀"
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile app with native features and offline support",
      tags: ["React Native", "SQLite", "Push"],
      image: "📱"
    },
    {
      title: "API Service",
      description: "RESTful API with authentication, database integration, and documentation",
      tags: ["Node.js", "Express", "MongoDB"],
      image: "🔌"
    }
  ];

  return (
    <section id="templates" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with proven templates or let AI create a custom solution for your unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="text-4xl mb-4">{template.image}</div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
