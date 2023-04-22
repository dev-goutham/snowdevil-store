import {
  Product,
  SelectedOptionInput,
} from '@shopify/hydrogen/storefront-api-types';
import {AppLoadContext} from '@shopify/remix-oxygen';

interface Args {
  handle: string;
  context: AppLoadContext;
  selectedOptions: SelectedOptionInput[];
}

export const getProduct = async ({context, handle, selectedOptions}: Args) => {
  const {product} = await context.storefront.query<{product: Product}>(
    PRODUCT_QUERY,
    {
      variables: {
        handle,
        selectedOptions,
      },
    },
  );
  if (!product) {
    throw new Error(`No product with the handle ${handle}`);
  }
  return product;
};

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql ${PRODUCT_VARIANT_FRAGMENT}
query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
  product(handle: $handle) {
    id
    title
    description
    vendor
    seo {
      description
    }
    images(first: 250) {
      nodes{
        height
        id
        url
        width
        altText
      }
    }
    vendor
    options {
      name
      values
    }
    variantBySelectedOptions(selectedOptions: $selectedOptions){
      ...ProductVariantFragment
    }
    variants(first: 100) {
      nodes {
        ...ProductVariantFragment
      }
    }
  }
}
`;
