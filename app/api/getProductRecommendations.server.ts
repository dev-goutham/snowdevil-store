import {Product} from '@shopify/hydrogen/storefront-api-types';
import {AppLoadContext} from '@shopify/remix-oxygen';

interface Args {
  productId: string;
  context: AppLoadContext;
}

export const getProductRecommendations = async ({context, productId}: Args) => {
  return await context.storefront.query<{productRecommendations: Product[]}>(
    PRODUCT_RECOMMENDATIONS_QUERY,
    {
      variables: {
        productId,
      },
    },
  );
};

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query product_recommendations($productId: ID!){
    productRecommendations(productId: $productId){
      title
      description
      seo{
        description
      }
      handle
      availableForSale
      featuredImage{
        altText
        height
        id
        url
        width
      }
      compareAtPriceRange{
        maxVariantPrice{
          amount
        }
        minVariantPrice{
          amount
        }
      }
      priceRange {
        maxVariantPrice{
          amount
        }
        minVariantPrice{
          amount
        }
      }
    }
  }
`;
