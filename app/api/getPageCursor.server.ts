import {AppLoadContext} from '@shopify/remix-oxygen';

interface Args {
  pageNumber: number;
  handle: string;
  context: AppLoadContext;
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

export const getPageCursor = async ({pageNumber, handle, context}: Args) => {
  const first = (pageNumber - 1) * 9 || 9;

  const {
    collection: {
      products: {
        pageInfo: {endCursor: cursorRes},
      },
    },
  } = await context.storefront.query<ReturnValue>(CURSOR_QUERY, {
    variables: {
      handle,
      first: first <= 250 ? first : 250,
    },
  });

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
    },
  });
  return endCursor;
};

const CURSOR_QUERY = `#graphql
  query cursor($handle: String, $first: Int){
    collection(handle: $handle){
      products(first: $first){
        pageInfo{          
          endCursor
        }
      }
    }
  }
`;

const CURSOR_QUERY_WITH_CURSOR = `#graphql
  query cursor($handle: String, $first: Int, $cursor: String){
    collection(handle: $handle){
      products(first: $first, after: $cursor){
        pageInfo{
          endCursor
        }
      }
    }
  }
`;
