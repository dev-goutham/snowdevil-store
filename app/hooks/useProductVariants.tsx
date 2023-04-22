import {
  Product,
  ProductVariant,
  SelectedOption,
  SelectedOptionInput,
} from '@shopify/hydrogen/storefront-api-types';
import {useState, useEffect, useCallback} from 'react';
import {useManipulateSearchParams} from './useManipulateSearchParams';

export const useProductVariants = (
  product: Product,
  selectedOptionsFromParams: SelectedOptionInput[] = [],
) => {
  const {setNewParamsValue} = useManipulateSearchParams();
  const defaultOptions =
    selectedOptionsFromParams.length > 0
      ? selectedOptionsFromParams
      : product.variants.nodes[0].selectedOptions;

  const variantBySelectedOptions = product.variantBySelectedOptions as
    | ProductVariant
    | undefined;

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(variantBySelectedOptions || product.variants.nodes[0]);

  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const [availabilityStatus, setAvaialabilityStatus] = useState<
    'in stock' | 'out of stock' | 'unavailable'
  >('in stock');

  useEffect(() => {
    if (!selectedVariant) {
      setAvaialabilityStatus('unavailable');
    } else if (!selectedVariant.availableForSale) {
      setAvaialabilityStatus('out of stock');
    } else {
      setAvaialabilityStatus('in stock');
    }
  }, [selectedVariant, setAvaialabilityStatus]);

  useEffect(() => {
    selectVariant();
  }, [selectedOptions]);

  const selectVariant = useCallback(() => {
    const newSelectedVariant = product.variants.nodes.find(
      (variant) =>
        JSON.stringify(variant.selectedOptions) ===
        JSON.stringify(selectedOptions),
    )! as ProductVariant | undefined;

    setSelectedVariant(() => newSelectedVariant);
  }, [setSelectedVariant, product, selectedOptions]);

  const selectOption = useCallback(
    ({name, value}: {name: string; value: string}) => {
      const newSelectedOptions = selectedOptions.map((option) => {
        if (option.name === name) {
          return {name, value};
        } else {
          return option;
        }
      }) as SelectedOption[];
      setSelectedOptions(newSelectedOptions);
      newSelectedOptions.forEach(({name, value}) => {
        setNewParamsValue(name, value);
      });
    },
    [selectedOptions],
  );

  return {
    selectedVariant,
    selectedOptions,
    availabilityStatus,
    selectOption,
  };
};
