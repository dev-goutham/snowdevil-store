/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */

import {Link} from '@remix-run/react';
import Button from '~/components/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-around mt-12 gap-7 lg:flex-row app-container">
      <div className="max-w-sm md:max-w-lg">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 font md:text-6xl">
          Hit the Slopes in Style with <span>Snow Devil</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Ready to shred some fresh powder? We&apos;ve got everything from the
          latest gear to stylish apparel, so you can look and feel your best on
          the mountain.
        </p>
        <Button className="mt-4" impact="bold" size="large">
          <Link to="/collections/all">View Catalog</Link>
        </Button>
      </div>
      <img
        className="block max-w-sm md:max-w-xl"
        src="/images/Hero-3.jpg"
        alt="hero"
      />
    </div>
  );
};

export default HeroSection;
