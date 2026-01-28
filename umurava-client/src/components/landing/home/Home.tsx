import MainLayout from "@/layouts/MainLayout";
import Hero from "./Hero";
import Section2 from "./Section2";
import Section3 from "./Section3";
import FeaturesSection from "./FeaturesSection";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import PartnersSection from "./PartnersSection";
import Section9 from "./Section9";
import ContactSection from "./ContactSection";

export default function HomeLand() {
  return (
    <div>
      <MainLayout>
        <Hero />
        <Section2 />
        <Section3 />
        <FeaturesSection />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <PartnersSection />
        <Section9 />
        <ContactSection />
      </MainLayout>
    </div>
  );
}
