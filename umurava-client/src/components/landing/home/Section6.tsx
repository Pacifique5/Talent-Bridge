import Case from "../../../../public/icons/case1.svg";
import Badge from "../../../../public/icons/badge.svg";
import Prize from "../../../../public/icons/prize.svg";
import Trend from "../../../../public/icons/trend.svg";
import Banner from "../../../../public/hero/skillBanner.png";
import { Target, TrendingUp, Award, Users } from "lucide-react";

import Image from "next/image";

export default function Section6() {
  const benefits = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Enhance Employment Path",
      description: "Network with talented individuals and learn from their experiences"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Personal Growth",
      description: "Challenge yourself, learn new skills, and expand your professional network"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Recognition & Prizes",
      description: "Gain valuable experience and knowledge to advance your career in the digital economy"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Learn from Experts",
      description: "Access insights and guidance from experienced professionals in digital careers"
    }
  ];

  return (
    <div className="bg-[#F9FAFB] my-10 md:my-16 lg:my-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What else can I gain from participating in Skills Challenges?
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join Skills Challenges Program to accelerate your career growth and
            become part of Africa's largest workforce of digital professionals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Benefits Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-light/10 text-blue-light mb-4 group-hover:bg-blue-light group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-light transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Image */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Image 
                src={Banner} 
                alt="Umurava banner" 
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
