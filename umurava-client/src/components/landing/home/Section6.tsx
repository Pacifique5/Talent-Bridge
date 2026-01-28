import Banner from "../../../../public/hero/skillBanner.png";
import { Target, TrendingUp, Award, Users } from "lucide-react";

import Image from "next/image";

export default function Section6() {
  const benefits = [
    {
      icon: <Target className="h-9 w-9" />,
      title: "Enhance Employment Path",
      description: "Network with talented individuals and learn from their experiences"
    },
    {
      icon: <TrendingUp className="h-9 w-9" />,
      title: "Personal Growth",
      description: "Challenge yourself, learn new skills, and expand your professional network"
    },
    {
      icon: <Award className="h-9 w-9" />,
      title: "Recognition & Prizes",
      description: "Gain valuable experience and knowledge to advance your career in the digital economy"
    },
    {
      icon: <Users className="h-9 w-9" />,
      title: "Learn from Experts",
      description: "Access insights and guidance from experienced professionals in digital careers"
    }
  ];

  return (
    <div className="bg-[#F9FAFB] dark:bg-gray-800 my-10 md:my-16 lg:my-20 px-6 sm:px-10 lg:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What else can I gain from participating in Skills Challenges?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Join Skills Challenges Program to accelerate your career growth and
            become part of Africa&apos;s largest workforce of digital professionals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Benefits Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-700 rounded-xl p-10 min-h-[350px] flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-18 h-18 rounded-lg bg-blue-light/10 dark:bg-blue-400/10 text-blue-light dark:text-blue-400 mb-10 group-hover:bg-blue-light group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-6 group-hover:text-blue-light dark:group-hover:text-blue-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-light/5 dark:from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Image */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Image 
                src={Banner} 
                alt="TalentBridge banner" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-light rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-dark rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
