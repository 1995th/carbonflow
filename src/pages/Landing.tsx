import { Header } from '../components/Header';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { StatsSection } from '../components/landing/StatsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { MarketplaceSection } from '../components/marketplace/MarketplaceSection';

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <MarketplaceSection />
      </main>
    </div>
  );
}