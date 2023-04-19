import {Filter} from '@shopify/hydrogen/storefront-api-types';
import {loader} from '~/routes/collections.$handle';

export type LoaderType = Awaited<ReturnType<typeof loader>>;

export interface Props {
  filters: Filter[];
  selectedFilters: LoaderType['selectedFilters'];
  priceRange: LoaderType['priceRange'];
  selectedPriceRange: LoaderType['selectedPriceRange'];
}
