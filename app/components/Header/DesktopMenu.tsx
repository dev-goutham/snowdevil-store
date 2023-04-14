import {Popover, Transition} from '@headlessui/react';
import {Link, useNavigate, useNavigation} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {
  MenuItem,
  Image as ImageType,
} from '@shopify/hydrogen/storefront-api-types';
import {Fragment, useEffect} from 'react';
import {loader} from '~/root';

interface DesktopMenuProps {
  items: MenuItem[];
  url: string;
  collections: Awaited<ReturnType<typeof loader>>['layout']['collections'];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({items, url, collections}) => {
  const navigate = useNavigate();

  return (
    <nav className="items-center justify-center flex-grow hidden gap-6 lg:flex">
      {items.map((item) => {
        if (item.items.length === 0) {
          return (
            <Link key={item.title} to={item.url!.split(url)[1]}>
              {item.title}
            </Link>
          );
        } else {
          return (
            <Popover key={item.title}>
              {({open, close}) => (
                <>
                  <Popover.Button
                    className={
                      open
                        ? 'text-blue-600 relative border-none focus:outline-none focus:border-none  outline-none '
                        : 'text-inherit'
                    }
                  >
                    {item.title}
                    {open && (
                      <span className="h-[2px] w-full top-[42px]   absolute left-0 bottom-0 bg-blue-600" />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-50"
                    leaveFrom="opacity-100 "
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel className="absolute shadow-md text-gray-700 top-[65px] duration-500 transition-opacity opacity-100  bg-white left-0 right-0 w-full">
                      <div className="app-container">
                        <div className="flex justify-around py-12 border-t border-t-gray-200">
                          {item.items.map((item) => {
                            const image = collections.nodes.find(
                              (node) => node.title === item.title,
                            )?.image as unknown as ImageType;
                            return (
                              <Link
                                className="flex flex-col justify-between"
                                key={item.url}
                                to={item.url!.split(url)[1]}
                                onClick={close}
                              >
                                <div className="flex items-center h-full rounded-md">
                                  <Image
                                    data={{
                                      url: image.url,
                                      width: 165,
                                      height: 175,
                                    }}
                                    className="w-[165px] h-[165px] object-cover rounded-md block"
                                  />
                                </div>
                                <div className="mt-3 text-sm font-semibold">
                                  {item.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Shop now
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          );
        }
      })}
    </nav>
  );
};

export default DesktopMenu;
