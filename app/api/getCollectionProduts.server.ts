import {
  Filter,
  PageInfo,
  Product,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';
import {AppLoadContext} from '@shopify/remix-oxygen';
import {getPageCursor} from './getPageCursor.server';

interface Args {
  context: AppLoadContext;
  handle: string;
  pageNumber: number;
  filters: ProductFilter[];
}

interface ReturnValue {
  collection: {
    id: string;
    products: {pageInfo: PageInfo; nodes: Product[]; filters: Filter[]};
  };
}

export const getCollectionProducts = async (args: Args) => {
  let res: ReturnValue;
  if (args.pageNumber === 1) {
    res = await getProducts(args);
  } else {
    const cursor = await getPageCursor(args);
    res = await getProductsWithCursor({...args, cursor});
  }

  if (!res!.collection) {
    throw new Response(null, {status: 404});
  } else {
    return res.collection;
  }
};

const getProducts = async ({context, handle, filters}: Args) => {
  const {collection} = await context.storefront.query<ReturnValue>(
    COLLECTION_QUERY,
    {
      variables: {
        handle,
        filters,
      },
    },
  );
  return {collection};
};
const getProductsWithCursor = async ({
  context,
  handle,
  cursor,
  filters,
}: Args & {cursor: string}) => {
  const {collection} = await context.storefront.query<ReturnValue>(
    COLLECTION_QUERY_WITH_CURSOR,
    {
      variables: {
        handle,
        cursor,
        filters,
      },
    },
  );
  return {collection};
};

const COLLECTION_QUERY = `#graphql
query collection($handle: String!, $filters: [ProductFilter!]) {
  collection(handle: $handle) {
    id
    products(first: 9, filters: $filters) {
      filters{
        label
        type
        values{
          label
          input
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      nodes {
        id
        title
        description
        handle
        seo{
          title
          description
        }
        featuredImage {
          url
          height
          width
        }
        availableForSale
        compareAtPriceRange{
          maxVariantPrice{
            amount
          }
          minVariantPrice{
            amount
          }
        }
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice{
            amount
          }
        }
      }
    }
  }
}
`;
const COLLECTION_QUERY_WITH_CURSOR = `#graphql
query collection($handle: String!, $cursor: String!, $filters: [ProductFilter!]) {
  collection(handle: $handle) {
    id
    products(first: 9, after: $cursor, filters: $filters) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      filters{
        label
        type
        values{
          label
          input
        }
      }
      nodes {
        id
        title
        description
        handle
        seo{
          title
          description
        }
        featuredImage {
          url
          height
          width
        }
        availableForSale
        compareAtPriceRange{
          maxVariantPrice{
            amount
          }
          minVariantPrice{
            amount
          }
        }
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice{
            amount
          }
        }
      }
    }
  }
}
`;
