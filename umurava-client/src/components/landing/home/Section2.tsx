import Image from "next/image";
import Case from "../../../../public/icons/case.svg";
import { Trophy, Target, Briefcase } from "lucide-react";

export default function Section2() {
  const features = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Build a Strong Portfolio",
      description: "Tackle real-world projects through challenges and hackathons that mirror business needs. Showcase your skills to potential employers.",
      highlight: true
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Enhance Your Employment Path",
      description: "Develop in-demand skills and build a strong portfolio to increase your chances of landing your dream job.",
      highlight: false
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Earn Recognition and Prizes",
      description: "Earn money and knowledge prizes by participating in contests and competitions from partner companies.",
      highlight: false
    }
  ];

  return (
    <div className="bg-[#F9FAFB] pt-16 lg:pt-24 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Experience a New Way of Building Work Experience
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join Skills Challenges Program to accelerate your career growth and
            become part of Africa's largest workforce of digital professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                feature.highlight 
                  ? 'bg-gradient-to-br from-blue-light to-blue-dark text-white md:col-span-2 lg:col-span-1' 
                  : 'bg-white text-gray-900 shadow-md hover:shadow-lg border border-gray-100'
              }`}
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transform translate-x-8 -translate-y-8 ${
                feature.highlight ? 'bg-white' : 'bg-blue-light'
              }`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                feature.highlight 
                  ? 'bg-white/20 text-white' 
                  : 'bg-blue-light/10 text-blue-light'
              }`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className={`font-bold text-lg mb-3 ${
                  feature.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  feature.highlight ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                feature.highlight 
                  ? 'bg-gradient-to-br from-blue-dark/20 to-transparent' 
                  : 'bg-gradient-to-br from-blue-light/5 to-transparent'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
