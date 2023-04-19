import {Disclosure, Transition} from '@headlessui/react';
import {IoChevronDownOutline} from 'react-icons/io5';
import {useManipulateSearchParams} from '~/hooks/useManipulateSearchParams';
import {cx} from '~/utils/classNames';
import {Props} from './typings';
import PriceRangeSlider from './PriceRangeSlider';

const FiltersForm: React.FC<Props> = ({
  filters,
  selectedFilters,
  priceRange,
  selectedPriceRange,
}) => {
  const {appendToSearchParams, removeFromSearchParams, setNewParamsValue} =
    useManipulateSearchParams();

  return (
    //key is just so that the component re-renders when selectedFiters change
    <form
      key={JSON.stringify({selectedFilters, selectedPriceRange})}
      className="w-full"
    >
      <PriceRangeSlider
        priceRange={priceRange}
        selectedPriceRange={selectedPriceRange}
      />
      {filters.map((section) => {
        if (section.type !== 'PRICE_RANGE') {
          return (
            <Disclosure
              as="div"
              defaultOpen
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
                        {section.values.map((option, optionIdx) => {
                          let input = option.input as string;
                          input = input.replace('true', '"true"');
                          input = input.replace('false', '"false"');
                          return (
                            <div
                              key={option.label}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}-mobile`}
                                name={`${section.id}[]`}
                                onChange={(e) => {
                                  setNewParamsValue('page', '1');
                                  if (e.target.checked) {
                                    appendToSearchParams(e.target.value);
                                  } else {
                                    const [key, val] = Object.entries(
                                      JSON.parse(e.target.value),
                                    )[0];
                                    const value = (val as string)
                                      .split(' ')
                                      .join('+');
                                    const paramsToRemove = `${key}=${value}`;
                                    removeFromSearchParams(paramsToRemove);
                                  }
                                }}
                                defaultChecked={selectedFilters.includes(input)}
                                defaultValue={input}
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
                          );
                        })}
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

export default FiltersForm;
