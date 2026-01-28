import Image from "next/image";

// Partner logos
import ared from "../../../../public/partners/ared.png";
import ciba from "../../../../public/partners/ciba.png";
import edu from "../../../../public/partners/edu.png";
import hiil from "../../../../public/partners/hiil.png";
import igihe from "../../../../public/partners/igihe.png";
import kepler from "../../../../public/partners/kepler.png";
import kigali from "../../../../public/partners/kigali.png";
import laterile from "../../../../public/partners/laterile.png";
import soko from "../../../../public/partners/soko.png";
import tori from "../../../../public/partners/tori.png";
import viamo from "../../../../public/partners/viamo.png";

export default function PartnersSection() {
  const partners = [
    ared, ciba, edu, hiil, igihe, kepler, 
    kigali, laterile, soko, tori, viamo
  ];

  return (
    <div className="my-20 px-10 md:px-20 lg:px-26 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-[40px] font-bold md:font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Trusted by Leading Organizations
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Join hundreds of companies and institutions that trust TalentBridge to develop their talent
        </p>
      </div>

      {/* The marquee */}
      <div className="overflow-hidden">
        <div className="flex space-x-10 animate-scroll">
          {partners.concat(partners).map((partner, index) => (
            <Image
              key={index}
              src={partner}
              alt="partner logo"
              className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            />
          ))}
        </div>
        <div className="flex space-x-10 animate-scroll-reverse mt-4">
          {partners.concat(partners).map((partner, index) => (
            <Image
              key={index}
              src={partner}
              alt="partner logo"
              className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}