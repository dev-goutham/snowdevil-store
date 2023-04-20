import {Popover} from '@headlessui/react';
import {IoClose} from 'react-icons/io5';
import {AiOutlinePlus} from 'react-icons/ai';
import Drawer from '~/components/Drawer';
import {Props} from './typings';
import FiltersForm from './FiltersForm';

const Filters: React.FC<Props> = ({
  filters,
  selectedFilters,
  priceRange,
  selectedPriceRange,
}) => {
  return (
    <div>
      <div className="hidden w-64 mr-6 lg:block">
        <h3 className="mb-4 text-xl font-semibold text-gray-400">Filters</h3>

        <FiltersForm
          priceRange={priceRange}
          selectedFilters={selectedFilters}
          filters={filters}
          selectedPriceRange={selectedPriceRange}
        />
      </div>
      <Popover className="block lg:hidden">
        {({open, close}) => {
          return (
            <>
              <Popover.Button className="inline-flex items-center mb-4 lg:hidden">
                <span className="text-lg font-medium text-gray-700">
                  Filters
                </span>
                <AiOutlinePlus
                  className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />
              <Drawer
                open={open}
                enter="transition-all ease-out duration-1000"
                enterFrom="translate-x-[400px]"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[400px]"
              >
                <Popover.Panel className="w-[360px] h-screen overflow-y-scroll  v-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-blue-600 p-8 scroll-smooth snap-y scrollbar-track-gray-200 max-w-[360px] bg-white shadow-sm right-0 top-0 bottom-0 absolute  max-h-screen">
                  <button onClick={close} className="absolute top-5 left-5">
                    <IoClose className="w-8 h-8" />
                  </button>
                  <div className="mt-16 w-72">
                    <FiltersForm
                      selectedFilters={selectedFilters}
                      filters={filters}
                      priceRange={priceRange}
                      selectedPriceRange={selectedPriceRange}
                    />
                  </div>
                </Popover.Panel>
              </Drawer>
            </>
          );
        }}
      </Popover>
    </div>
  );
};

export default Filters;
