import ReactSlider from 'react-slider';
import {Props} from './typings';
import {useState} from 'react';
import useCurrency from '~/hooks/useCurrency';
import {useManipulateSearchParams} from '~/hooks/useManipulateSearchParams';

const PriceRangeSlider: React.FC<{
  priceRange: Props['priceRange'];
  selectedPriceRange: Props['selectedPriceRange'];
}> = ({
  priceRange: {
    price: {max},
  },
  selectedPriceRange,
}) => {
  const priceRangeDefaults = selectedPriceRange
    ? [(selectedPriceRange[0] / max) * 100, (selectedPriceRange[1] / max) * 100]
    : [0, 100];
  const [priceRange, setPriceRange] = useState<[number, number]>(
    priceRangeDefaults as [number, number],
  );
  const {setNewParamsValue} = useManipulateSearchParams();

  const minPrice = useCurrency((priceRange[0] * max) / 100, true);
  const maxPrice = useCurrency((priceRange[1] * max) / 100, true);

  return (
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
        defaultValue={priceRangeDefaults}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        pearling
        minDistance={1}
        onChange={([min, max]) => {
          setPriceRange(() => [Math.ceil(min), Math.ceil(max)]);
        }}
        onAfterChange={([minVal, maxVal]) => {
          const minPrice = Math.ceil((minVal * max) / 100);
          const maxPrice = Math.ceil((maxVal * max) / 100);
          const priceString = `${minPrice}-${maxPrice}`;
          setNewParamsValue('priceRange', priceString);
          setNewParamsValue('page', '1');
        }}
      />
    </fieldset>
  );
};

export default PriceRangeSlider;
