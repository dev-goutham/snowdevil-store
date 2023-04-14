/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */
import {Link, useLoaderData} from '@remix-run/react';
import {loader} from '~/root';
import {FaShoppingCart} from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import CurrencySelector from '../CurrencySelector';

const Header: React.FC = () => {
  const {
    layout: {
      shop: {
        primaryDomain: {url},
      },
      menu: {items},
      collections,
    },
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <header className="relative  flex items-center h-[65px] ">
      <div className="flex justify-between w-full py-4 tracking-wider app-container ">
        <div className="flex items-center gap-8">
          <MobileMenu items={items} collections={collections} url={url} />
          <Link to="/">
            <img className="w-8" src="/snow-devil-logo.svg" alt="logo" />
          </Link>
        </div>
        <DesktopMenu items={items} collections={collections} url={url} />
        <div className="flex items-center gap-6">
          <CurrencySelector />
          <div>Search</div>
          <div className="flex items-center gap-2">
            <span>
              <FaShoppingCart className="-translate-y-[0.5px]" />
            </span>
            <span>0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
