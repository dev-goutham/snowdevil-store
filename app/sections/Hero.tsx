/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */

import {Transition} from '@headlessui/react';
import {Link} from '@remix-run/react';
import {useEffect, useState} from 'react';
import Button from '~/components/Button';
import useIsShowing from '~/hooks/useIsShowing';

const HeroSection: React.FC = () => {
  const isShowing = useIsShowing();

  return (
    <section>
      <Transition.Root show={isShowing}>
        <div className="flex flex-col-reverse items-center justify-around mt-12 gap-7 lg:flex-row app-container">
          <Transition.Child
            as={'div'}
            enter="transition duration-200 ease-in"
            enterFrom="opacity-90 translate-y-4 lg:translate-y-0 lg:-translate-x-4"
            enterTo="opacity-100 translate-y-0 lg:transtalte-x-0"
          >
            <div className="max-w-sm -z-10 md:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 font md:text-6xl">
                Hit the Slopes in Style with <span>Snow Devil</span>
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Ready to shred some fresh powder? We&apos;ve got everything from
                the latest gear to stylish apparel, so you can look and feel
                your best on the mountain.
              </p>
              <Button className="mt-4" impact="bold" size="large">
                <Link to="/collections/all">View Catalog</Link>
              </Button>
            </div>
          </Transition.Child>
          <Transition.Child
            as={'div'}
            enter="transition duration-200 ease-in"
            enterFrom="opacity-90 -translate-y-4 lg:translate-y-0 lg:translate-x-4"
            enterTo="opacity-100 transtalte-y-0 lg:translate-x-0"
          >
            <img
              className="block max-w-sm -z-10 md:max-w-xl"
              src="/images/Hero-3.jpg"
              alt="hero"
            />
          </Transition.Child>
        </div>
      </Transition.Root>
    </section>
  );
};

export default HeroSection;
