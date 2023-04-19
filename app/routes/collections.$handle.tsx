import {useLoaderData, useSearchParams} from '@remix-run/react';
import {ProductFilter} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {getCollectionProducts} from '~/api/getCollectionProduts.server';
import Filters from '~/components/Filter';
import Pagination from '~/components/Pagination';
import ProductCard from '~/components/ProductCard';

const CollectionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    products,
    pageInfo,
    filters,
    selectedFilters,
    priceRange,
    selectedPriceRange,
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const currentPage = searchParams.get('page') || '1';
  const hasPreviousPage = pageInfo.hasPreviousPage;
  const hasNextPage = pageInfo.hasNextPage;

  return (
    <div className="flex flex-col my-12 app-container lg:justify-between lg:flex-row lg:my-24">
      <Filters
        priceRange={priceRange}
        selectedFilters={selectedFilters}
        filters={filters}
        selectedPriceRange={selectedPriceRange}
      />
      <div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={+currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
};

export default CollectionsPage;

export const loader = async ({params, context, request}: LoaderArgs) => {
  const handle = params.handle || 'all';

  const searchParams = new URLSearchParams(request.url.split('?')[1]).entries();
  const selectedFilters: string[] = [];
  let selectedPriceRange: [number, number] | null = null;

  const filtersFromParams: ProductFilter[] = [];
  let pageNumber = 1;

  Array.from(searchParams).forEach((param) => {
    if (param[0] === 'page') {
      pageNumber = Number(param[1]);
    } else if (param[0] === 'available') {
      const str = JSON.stringify({available: param[1]});
      selectedFilters.push(str);
      filtersFromParams.push({
        available: param[1] === 'true',
      });
    } else if (param[0] === 'priceRange') {
      const [min, max] = param[1].split('-');
      selectedPriceRange = [Number(min), Number(max)];
      filtersFromParams.push({
        price: {
          min: Number(min),
          max: Number(max),
        },
      });
    } else {
      const str = JSON.stringify({[`${param[0]}`]: param[1]});
      selectedFilters.push(str);
      filtersFromParams.push({
        [param[0]]: param[1],
      });
    }
  });

  try {
    const {products} = await getCollectionProducts({
      context,
      handle,
      pageNumber,
      filters: filtersFromParams,
    });

    const priceRange = JSON.parse(
      products.filters.find((filter) => filter.label === 'Price')!.values[0]
        .input as string,
    ) as {
      price: {
        min: number;
        max: number;
      };
    };

    console.log(priceRange.price);

    return {
      pageInfo: products.pageInfo,
      products: products.nodes,
      filters: products.filters,
      selectedFilters,
      selectedPriceRange,
      priceRange,
    };
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error));
  }
};
