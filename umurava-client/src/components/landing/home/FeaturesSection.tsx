import { CheckCircle, Users, Trophy, Zap, Globe, Award } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Real-World Projects",
      description: "Work on actual business challenges from partner companies and organizations."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Mentorship",
      description: "Get guidance from experienced professionals in your field of interest."
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Skill Certification",
      description: "Earn recognized certificates and badges for completed challenges."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast-Track Learning",
      description: "Accelerate your learning with hands-on, project-based experiences."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Connect with talented individuals across Africa and beyond."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Career Opportunities",
      description: "Get discovered by top employers looking for skilled professionals."
    }
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Choose Umurava Skills Challenges?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of professionals who have accelerated their careers through our innovative project-based learning platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-light/10 dark:bg-blue-400/10 rounded-lg text-blue-light dark:text-blue-400 group-hover:bg-blue-light group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-light dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}