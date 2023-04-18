import {Disclosure, Popover, Transition} from '@headlessui/react';
import {Filter} from '@shopify/hydrogen/storefront-api-types';
import {IoChevronDownOutline, IoClose} from 'react-icons/io5';
import {AiOutlinePlus} from 'react-icons/ai';
import {cx} from '~/utils/classNames';
import {Fragment, useState} from 'react';
import ReactSlider from 'react-slider';
import useCurrency from '~/hooks/useCurrency';
import Drawer from './Drawer';

interface Props {
  filters: Filter[];
}

const Filters: React.FC<Props> = ({filters}) => {
  return (
    <div>
      <div className="hidden w-64 mr-6 lg:block">
        <h3 className="mb-4 text-xl font-semibold text-gray-400">Filters</h3>
        <FiltersForm filters={filters} />
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
                <Popover.Panel className="w-[360px] overflow-y-scroll v-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-blue-600 p-8 scroll-smooth snap-y scrollbar-track-gray-200 max-w-[360px] bg-white shadow-sm right-0 top-0 bottom-0 absolute  min-h-screen">
                  <button onClick={close} className="absolute top-5 left-5">
                    <IoClose className="w-8 h-8" />
                  </button>
                  <div className="mt-16 w-72">
                    <FiltersForm filters={filters} />
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

const FiltersForm: React.FC<Props> = ({filters}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const minPrice = useCurrency(priceRange[0] * 10);
  const maxPrice = useCurrency(priceRange[1] * 10);
  return (
    <form className="w-full">
      <fieldset>
        <legend className="w-full px-4 text-gray-400 hover:text-gray-500">
          <span className="text-sm font-medium text-gray-900">
            <span>Price Range: </span>
            <span className="ml-1 font-semibold tracking-wider ">
              {minPrice} - {maxPrice}
            </span>
          </span>
        </legend>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={[0, 100000]}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          pearling
          minDistance={1}
          // onAfterChange={(value) => {
          //   setPriceRange((prev) => value as [number, number]);
          // }}
          onChange={(value) => {
            setPriceRange(() => value as [number, number]);
          }}
        />
      </fieldset>
      {filters.map((section) => {
        if (section.type !== 'PRICE_RANGE') {
          return (
            <Disclosure
              as="div"
              key={section.label}
              className="pt-4 pb-4 border-t border-gray-200"
            >
              {({open}) => (
                <fieldset>
                  <legend className="w-full px-2">
                    <Disclosure.Button className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                      <span className="text-sm font-medium text-gray-900">
                        {section.label}
                      </span>
                      <span className="flex items-center ml-6 h-7">
                        <IoChevronDownOutline
                          className={cx(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-5 w-5 transform',
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </legend>
                  <Transition
                    enter="transition duration-200 origin-top ease-out"
                    enterFrom="transform scale-y-0"
                    enterTo="transform scale-y-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-y-100 "
                    leaveTo="transform scale-y-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                      <div className="space-y-6">
                        {section.values.map((option, optionIdx) => (
                          <div key={option.label} className="flex items-center">
                            <input
                              id={`${section.id}-${optionIdx}-mobile`}
                              name={`${section.id}[]`}
                              defaultValue={option.input as string}
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}-mobile`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </fieldset>
              )}
            </Disclosure>
          );
        }
      })}
    </form>
  );
};

export default Filters;
