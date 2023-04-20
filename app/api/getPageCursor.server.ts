import {ProductFilter} from '@shopify/hydrogen/storefront-api-types';
import {AppLoadContext} from '@shopify/remix-oxygen';

interface Args {
  pageNumber: number;
  handle: string;
  context: AppLoadContext;
  filters: ProductFilter[];
}

interface ReturnValue {
  collection: {
    products: {
      pageInfo: {
        endCursor: string;
      };
    };
  };
}

export const getPageCursor = async ({
  pageNumber,
  handle,
  context,
  filters,
}: Args) => {
  //page = 2 ? get the first 9 products and get the end cursor
  //page = 3 ? get the first 18 products and get the end cursor
  const first = (pageNumber - 1) * 9 || 9;

  const {
    collection: {
      products: {pageInfo},
    },
  } = await context.storefront.query<ReturnValue>(CURSOR_QUERY, {
    variables: {
      handle,
      first: first <= 250 ? first : 250,
      filters,
    },
  });

  const {endCursor: cursorRes} = pageInfo;
  const numberOfChunks = Math.ceil(first / 250);
  if (numberOfChunks === 1) {
    return cursorRes;
  } else {
    let cursor = cursorRes;
    let firstChunk = first;
    new Array(numberOfChunks - 1).fill(null).forEach(async () => {
      cursor = await getPageCursorWithCursor({
        context,
        cursor,
        first: firstChunk,
        handle,
        pageNumber,
        filters,
      });
      firstChunk = firstChunk - 250;
    });
    return cursor;
  }
};

const getPageCursorWithCursor = async ({
  context,
  cursor,
  handle,
  first,
  filters,
}: Args & {cursor: string; first: number}) => {
  first = first - 250;
  const {
    collection: {
      products: {
        pageInfo: {endCursor},
      },
    },
  } = await context.storefront.query<ReturnValue>(CURSOR_QUERY_WITH_CURSOR, {
    variables: {
      handle,
      first: first <= 250 ? first : 250,
      cursor,
      filters,
    },
  });
  return endCursor;
};

const CURSOR_QUERY = `#graphql
  query cursor($handle: String, $first: Int, $filters: [ProductFilter!]){
    collection(handle: $handle){
      products(first: $first, filters: $filters){
        pageInfo{     
          endCursor
        }
      }
    }
  }
`;

const CURSOR_QUERY_WITH_CURSOR = `#graphql
  query cursor($handle: String, $first: Int, $cursor: String, $filters: [ProductFilter!]){
    collection(handle: $handle){
      products(first: $first, after: $cursor, filters: $filters){
        pageInfo{
          endCursor
        }
      }
    }
  }
`;
