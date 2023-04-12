import {Popover, Transition, Tab} from '@headlessui/react';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {
  MenuItem,
  Image as ImageType,
} from '@shopify/hydrogen/storefront-api-types';
import {Fragment, useEffect} from 'react';
import {IoClose, IoMenu} from 'react-icons/io5';
import {loader} from '~/root';
import {cx} from '~/utils/classNames';

interface MobileMenuProps {
  items: MenuItem[];
  url: string;
  collections: Awaited<ReturnType<typeof loader>>['layout']['collections'];
}

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  return (
    <div className="block lg:hidden">
      <Popover>
        {({open, close}) => (
          <MobileMenuDrawer open={open} close={close} {...props} />
        )}
      </Popover>
    </div>
  );
};

interface MobileMenuDrawerProps extends MobileMenuProps {
  open: boolean;
  close: () => void;
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  open,
  close,
  items,
  collections,
  url,
}) => {
  useEffect(() => {
    const app = document.querySelector('body');
    if (open) {
      app!.style.overflow = 'hidden';
    } else {
      app!.style.overflow = 'auto';
    }
  }, [open]);

  const menuWithSubmenu: MenuItem[] = [];
  const menuItems: MenuItem[] = [];

  items.forEach((item) => {
    if (item.items.length === 0) {
      menuItems.push(item);
    } else {
      menuWithSubmenu.push(item);
    }
  });

  return (
    <>
      <Popover.Button>
        <IoMenu className="w-8 h-8 text-gray-500 translate-y-[4.5px] hover:text-gray-700 focus:text-gray-700" />
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="-translate-x-[448px]"
        enterTo="translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-[448px]"
      >
        <Popover.Panel className="w-[70%] overflow-y-scroll max-w-md bg-white shadow-sm left-0 top-0 bottom-0 absolute min-h-screen ">
          <button onClick={close} className="absolute top-5 left-5">
            <IoClose className="w-8 h-8" />
          </button>
          <div className="mt-16">
            <Tab.Group>
              <Tab.List className="grid grid-cols-2 pb-5 mx-5 space-x-5 border-b border-b-gray-300">
                {menuWithSubmenu.map((menu) => (
                  <Tab
                    className={({selected}) =>
                      cx(
                        selected
                          ? 'text-blue-600 menu-after relative'
                          : 'text-inherit',
                        'outline-none border-none focus:outline-none focus:border-none',
                      )
                    }
                    key={menu.title}
                  >
                    {menu.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {menuWithSubmenu.map((menu) => (
                  <Tab.Panel
                    className="grid h-full grid-cols-2 gap-5 p-5 "
                    key={menu.title}
                  >
                    {menu.items.map((subMenu) => {
                      const image = collections.nodes.find(
                        (node) => node.title === subMenu.title,
                      )?.image as unknown as ImageType;
                      return (
                        <Link
                          className="flex flex-col justify-between"
                          key={subMenu.url}
                          to={subMenu.url!.split(url)[1]}
                        >
                          <div className="flex items-center justify-center h-full p-2 border border-gray-200 rounded-md">
                            <Image
                              data={{
                                url: image.url,
                                width: 120,
                                height: 175,
                              }}
                              className="w-[120px] block"
                            />
                          </div>
                          <div className="mt-3 text-sm font-semibold">
                            {subMenu.title}
                          </div>
                          <div className="text-xs text-gray-500">Shop now</div>
                        </Link>
                      );
                    })}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            <hr className="my-5" />
            <div className="mx-5 mb-5">
              {menuItems.map((item) => (
                <Link
                  className="block my-5 text-lg font-semibold hover:text-gray-700"
                  key={item.title}
                  to={item.url!.split(url)[1]}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <hr className="my-5" />
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

export default MobileMenu;
