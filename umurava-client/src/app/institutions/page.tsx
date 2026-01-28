"use client";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import Banner from "../../../public/Frame.png";
import SKill from "../../../public/skill.png";
import Ellipse1 from "../../../public/icons/ellipse1.svg";
import Ellipse2 from "../../../public/icons/ellipse2.svg";

// the icons
import ared from "../../../public/partners/ared.png";
import ciba from "../../../public/partners/ciba.png";
import edu from "../../../public/partners/edu.png";
import hiil from "../../../public/partners/hiil.png";
import igihe from "../../../public/partners/igihe.png";
import kepler from "../../../public/partners/kepler.png";
import kigali from "../../../public/partners/kigali.png";
import laterile from "../../../public/partners/laterile.png";
import soko from "../../../public/partners/soko.png";
import tori from "../../../public/partners/tori.png";
import viamo from "../../../public/partners/viamo.png";

interface IntegrationPoint {
  id: number;
  text: string;
}

const integrationPoints: IntegrationPoint[] = [
  {
    id: 1,
    text: "As Career Development and Job Readiness Program",
  },
  {
    id: 2,
    text: "As Skills Assessments Method after a course or a term",
  },
  {
    id: 3,
    text: "As extracurricular activities to complement academic courses",
  },
  {
    id: 4,
    text: "As the portfolio of the Students",
  },
  {
    id: 5,
    text: "As part of Capstone Projects or final-year assignments",
  },
];

export default function Page() {
  return (
    <MainLayout>
      {/* First section */}
      <div className="flex flex-col lg:flex-row items-center gap-[1rem] md:gap-[3rem] lg:gap-[6rem] mx-8 mt-[6rem] md:mt-[10rem] bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col gap-3 md:pl-[3rem]">
          <h1 className="text-blue-light dark:text-blue-400 text-3xl md:text-[40px] font-bold md:font-extrabold">
            Accelerate Your Students and Traineess Employability and Career
            Growth through Project-based Learning Solution
          </h1>
          <p className="text-gray-800 dark:text-gray-300 text-[14px] sm:text-[16px]">
            We partner with Universities, Schools, and Trainining Institutions
            to build the work experience of their students and trainees through
            project based learning challenges and hackathons
          </p>
          <Link
            href={""}
            className="px-3 py-2 md:p-3 mt-3 w-[150px] text-white bg-blue-light hover:bg-blue-dark duration-500 rounded-md font-semibold text-center"
          >
            Partner with us
          </Link>
        </div>

        <div className="">
          <div className="md:h-[430px] md:w-[520px]">
            <Image src={Banner} height={380} alt="TalentBridge hero image" />
          </div>
        </div>
      </div>

      {/* the second section */}
      <div className="bg-[#F9FAFB] dark:bg-gray-800 my-20 px-6 sm:px-10 lg:px-20 py-16 rounded-2xl transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Key Offerings and Benefits
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Project-Based Learning",
                description: "Tackle real-world projects through challenges that mirror business needs and build practical skills."
              },
              {
                icon: "💼",
                title: "Portfolio Development",
                description: "Help students showcase their skills and accomplishments to potential employers through completed projects."
              },
              {
                icon: "🚀",
                title: "Career Readiness",
                description: "Prepare students for the job market with hands-on experience and industry-relevant skills."
              },
              {
                icon: "🎓",
                title: "Enhanced Learning",
                description: "Complement academic courses with practical, real-world applications and problem-solving."
              },
              {
                icon: "🏆",
                title: "Recognition & Awards",
                description: "Students earn recognition and prizes by participating in various contests and competitions."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl p-10 min-h-[400px] flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  index === 3 
                    ? 'bg-gradient-to-br from-blue-light to-blue-dark text-white md:col-span-2 lg:col-span-1' 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-600'
                }`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-28 h-28 rounded-full opacity-10 transform translate-x-12 -translate-y-12 ${
                  index === 3 ? 'bg-white' : 'bg-blue-light dark:bg-blue-400'
                }`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-lg mb-10 text-4xl ${
                  index === 3 
                    ? 'bg-white/20' 
                    : 'bg-blue-light/10 dark:bg-blue-400/10'
                }`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col justify-center">
                  <h3 className={`font-bold text-2xl mb-8 ${
                    index === 3 ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-lg leading-relaxed ${
                    index === 3 ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  index === 3 
                    ? 'bg-gradient-to-br from-blue-dark/20 to-transparent' 
                    : 'bg-gradient-to-br from-blue-light/5 dark:from-blue-400/5 to-transparent'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The partners section */}
      <div className="my-20 px-10 md:px-20 lg:px-26 relative z-[-1] bg-white dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-3xl md:text-[40px] font-bold md:font-extrabold text-center my-10 text-gray-900 dark:text-gray-100">
          Join a few Educational Institutions using <br /> Skills Challenges by
          TalentBridge
        </h1>
        {/* The marquee */}
        <div className="overflow-hidden">
          <div className="flex space-x-10 animate-marquee">
            {[
              ared,
              ciba,
              edu,
              hiil,
              igihe,
              kepler,
              kigali,
              laterile,
              soko,
              tori,
              viamo,
            ].map((icon, index) => (
              <Image
                key={index}
                src={icon}
                alt="partner logo"
                className="h-10 w-auto"
              />
            ))}
          </div>
          <div className="flex space-x-10 animate-marquee-reverse mt-4">
            {[
              ared,
              ciba,
              edu,
              hiil,
              igihe,
              kepler,
              kigali,
              laterile,
              soko,
              tori,
              viamo,
            ].map((icon, index) => (
              <Image
                key={index}
                src={icon}
                alt="partner logo"
                className="h-10 w-auto"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-reverse {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 20s linear infinite;
        }
      `}</style>

      {/* the other div */}
      <div className="max-w-7xl mx-auto p-8 md:p-12 my-20 px-10 md:px-20 lg:px-26 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] dark:text-gray-100 max-w-2xl mx-auto leading-tight">
            How Skills Challenges Program can Be Integrated into your Learning
            Institution
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {integrationPoints.map((point) => (
              <div key={point.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-light text-white flex items-center justify-center font-semibold">
                  {point.id}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="relative h-[400px] bg-blue-50 dark:bg-gray-700 rounded-3xl overflow-hidden -z-10 transition-colors duration-300">
            <Image
              src={SKill}
              alt="Skills platform interface"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="relative mx-10 md:mx-20 p-4 md:p-6 lg:p-10 bg-blue-light rounded-xl mt-5 mb-10 -z-10">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl mx-auto leading-tight py-6">
              Ready to transform your learning instition?
            </h2>
            <Link
              href={"/hello"}
              className="cursor-pointer px-3 py-2 my-3 md:p-3 mt-3 w-[150px] text-blue-light hover:text-white bg-white hover:bg-blue-light duration-500 rounded-md font-semibold text-center"
            >
              Let&apos;s Partner
            </Link>
          </div>
          <div className="absolute top-0 right-0">
            <Image src={Ellipse1} height={90} alt="ellipse icon" />
          </div>
          <div className="absolute bottom-0 left-0 ">
            <Image src={Ellipse2} height={70} alt="ellipse icon" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
