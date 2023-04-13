import HeroSection from '~/sections/Hero';
import IncentivesSection from '~/sections/Incentives';

const IndexPage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <IncentivesSection />
    </div>
  );
};

export default IndexPage;
