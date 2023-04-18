import {useLoaderData} from '@remix-run/react';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';
import FeaturedCollection from '~/sections/FeaturedCollection';
import HeroSection from '~/sections/Hero';
import IncentivesSection from '~/sections/Incentives';
import TestimonialsSection from '~/sections/TestimonialsSection';

const IndexPage: React.FC = () => {
  return (
    <div className="mb-12 space-y-16 md:space-y-24 lg:space-y-32">
      <HeroSection />
      <IncentivesSection />
      <FeaturedCollection />
      <TestimonialsSection />
    </div>
  );
};

export default IndexPage;

export async function loader({context}: LoaderArgs) {
  const indexQuery = await context.storefront.query<{
    collection: {
      products: {
        nodes: Product[];
      };
    };
  }>(INDEX_QUERY);
  return {indexQuery};
}

const INDEX_QUERY = `#graphql
  query index {
  collection(handle: "featured-collection") {
    products(first: 100) {
      nodes {
        title
        description
        seo{
          description
        }
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          altText
          height
          id
          url
          width
          __typename
        }
        handle
        }
      }
    }
  }
`;
