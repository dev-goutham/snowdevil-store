import {Menu, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {AiFillCaretDown} from 'react-icons/ai';
import {useCurrencySelector} from '~/context/CurrencySelector';

const CurrencySelector: React.FC = () => {
  const {changeSelected, selected, currencyOptions} = useCurrencySelector();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-[85px] items-center justify-center  px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <span>{selected}</span>
          <AiFillCaretDown className="translate-y-[1px] ml-2" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-[85px] mt-2 origin-top-right bg-indigo-50 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {currencyOptions.map(
              (currency) =>
                currency !== selected && (
                  <Menu.Item key={currency}>
                    {({active}) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group text-center flex w-full justify-center items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => changeSelected(currency)}
                      >
                        {currency}
                      </button>
                    )}
                  </Menu.Item>
                ),
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CurrencySelector;
