import { Hero } from '../components/Hero';
import { BrandStatement } from '../components/BrandStatement';
import { Navigation } from '../components/Navigation';
import { Footer7 } from '../components/ui/footer-7';
import { brandLine } from '../content/siteContent';
import { AboutSection } from '../sections/AboutSection';
import { ApproachSection } from '../sections/ApproachSection';
import { ContactSection } from '../sections/ContactSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { ServicesSection } from '../sections/ServicesSection';

export function HomePage() {
  return (
    <div className="version1-page">
      <Navigation />
      <main>
        <Hero />
        <BrandStatement text={brandLine} />
        <AboutSection />
        <ServicesSection />
        <IndustriesSection />
        <ApproachSection />
        <ContactSection />
        <Footer7 />
      </main>
    </div>
  );
}
