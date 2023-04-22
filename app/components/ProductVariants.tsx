import {RadioGroup} from '@headlessui/react';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {useProductVariants} from '~/hooks/useProductVariants';
import {cx} from '~/utils/classNames';

interface Props {
  options: Product['options'];
  selectOption: ReturnType<typeof useProductVariants>['selectOption'];
  selectedOptions: ReturnType<typeof useProductVariants>['selectedOptions'];
}

const ProductVariants: React.FC<Props> = ({
  options,
  selectOption,
  selectedOptions,
}) => {
  return (
    <div>
      {options.map((option) => (
        <RadioGroup
          onChange={(value) => {
            selectOption({name: option.name, value});
          }}
          className="my-2"
          key={option.name}
          value={
            selectedOptions.find((opt) => opt.name === option.name)!['value']
          }
        >
          <RadioGroup.Label className="text-lg font-semibold text-gray-600">
            {option.name}
          </RadioGroup.Label>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => (
              <RadioGroup.Option key={value} value={value}>
                {({checked}) => (
                  <span
                    className={cx(
                      'bg-black text-white mt-1 block cursor-pointer rounded-md text-lg px-6 py-2',
                      checked ? 'bg-indigo-700' : '',
                    )}
                  >
                    {value}
                  </span>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ))}
    </div>
  );
};

export default ProductVariants;
