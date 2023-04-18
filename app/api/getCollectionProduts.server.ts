import {
  Filter,
  PageInfo,
  Product,
} from '@shopify/hydrogen/storefront-api-types';
import {AppLoadContext} from '@shopify/remix-oxygen';
import {getPageCursor} from './getPageCursor.server';

interface Args {
  context: AppLoadContext;
  handle: string;
  pageNumber: number;
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

const getProducts = async ({context, handle}: Args) => {
  const {collection} = await context.storefront.query<ReturnValue>(
    COLLECTION_QUERY,
    {
      variables: {
        handle,
      },
    },
  );
  return {collection};
};
const getProductsWithCursor = async ({
  context,
  handle,
  cursor,
}: Args & {cursor: string}) => {
  const {collection} = await context.storefront.query<ReturnValue>(
    COLLECTION_QUERY_WITH_CURSOR,
    {
      variables: {
        handle,
        cursor,
      },
    },
  );
  return {collection};
};

const COLLECTION_QUERY = `#graphql
query collection($handle: String!) {
  collection(handle: $handle) {
    id
    products(first: 9) {
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
query collection($handle: String!, $cursor: String!) {
  collection(handle: $handle) {
    id
    products(first: 9, after: $cursor) {
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
