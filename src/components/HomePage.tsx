import HeroSection from './home/HeroSection';
import FeaturesSection from './home/FeaturesSection';
import ImpactMetricsSection from './home/ImpactMetricsSection';
import BlogSection from './home/BlogSection';
import PricingSection from './home/PricingSection';
import ContactSection from './home/ContactSection';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <ImpactMetricsSection />
      <BlogSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}