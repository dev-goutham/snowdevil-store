import {useLoaderData, useSearchParams} from '@remix-run/react';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {getCollectionProducts} from '~/api/getCollectionProduts.server';
import Filters from '~/components/Filter';
import Pagination from '~/components/Pagination';
import ProductCard from '~/components/ProductCard';

const CollectionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    products,
    productCount,
    pageInfo,
    filters,
    selectedFilters,
    priceRange,
    selectedPriceRange,
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const currentPage = searchParams.get('page') || '1';
  const numberOfPages = Math.ceil(productCount / 9);
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
          numberOfPages={numberOfPages}
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
  Array.from(searchParams).forEach((param) => {
    if (param[0] === 'priceRange') {
      const [min, max] = param[1].split('-');
      selectedPriceRange = [Number(min), Number(max)];
    } else {
      const str = JSON.stringify({[`${param[0]}`]: param[1]});
      selectedFilters.push(str);
    }
  });

  const pageNumber = Number(
    new URLSearchParams(request.url.split('?')[1]).get('page') || 1,
  );

  try {
    const {id, products} = await getCollectionProducts({
      context,
      handle,
      pageNumber,
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

    const token = context.env.SHOPIFY_ADMIN_TOKEN;
    const storeUrl = context.env.PUBLIC_STORE_DOMAIN;
    const apiVersion = context.env.PUBLIC_STOREFRONT_API_VERSION;

    const res = (await (
      await fetch(
        `https://${storeUrl}/admin/api/${apiVersion}/collections/${id
          .split('/')
          .at(-1)}.json`,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'X-Shopify-Access-Token': token,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
          },
        },
      )
    )
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .json()) as {collection: {products_count: number}};

    return {
      pageInfo: products.pageInfo,
      products: products.nodes,
      productCount: res.collection.products_count,
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