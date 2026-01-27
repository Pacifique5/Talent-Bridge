import Link from "next/link";
import Image from "next/image";

import hero1 from "../../../../public/hero/hero1.png";
import hero2 from "../../../../public/hero/hero2.png";
import hero3 from "../../../../public/hero/hero3.png";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-[2rem] md:gap-[5rem] lg:gap-[9rem] mx-8 mt-[6rem] md:mt-[10rem]">
      <div className="flex flex-col gap-3 md:pl-[3rem] relative">
        <h1 className="text-blue-light dark:text-blue-400 text-3xl md:text-[40px] font-bold md:font-extrabold">
          Build Work Experience <br /> through Skills Challenges <br /> Program
        </h1>
        <p className="text-gray-800 dark:text-gray-300 text-[14px] sm:text-[16px]">
          Enhance your Employability and Accelerate your Career <br /> Growth by
          working on Hands-on projects & hackathons <br /> from various
          businesses & organizations.
        </p>
        <Link
          href="/signup"
          className="relative z-10 px-4 py-3 mt-4 w-[150px] text-white bg-blue-light hover:bg-blue-dark duration-500 rounded-md font-semibold text-center cursor-pointer inline-block transition-all hover:scale-105 no-underline"
        >
          Get Started
        </Link>
      </div>

      <div className="relative flex gap-3">
        <div className="md:h-[330px] md:w-[220px] relative">
          <Image src={hero1} height={380} alt="Umurava hero image" />
        </div>
        <div className="md:h-[330px] md:w-[220px] relative">
          <Image src={hero2} height={380} alt="Umurava hero image" />
        </div>
        <div className="absolute bottom-0 -left-[30px] md:-left-[60px] z-0">
          <Image src={hero3} height={50} alt="Umurava hero image" />
        </div>
      </div>
    </div>
  );
}
