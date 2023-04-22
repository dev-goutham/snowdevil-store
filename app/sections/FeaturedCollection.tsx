import {Link, useLoaderData} from '@remix-run/react';
import {AiFillCaretRight} from 'react-icons/ai';
import ProductCarousel from '~/components/ProductsCarousel';
import {loader} from '~/routes';

const FeaturedCollection: React.FC = () => {
  const {
    indexQuery: {
      collection: {products},
    },
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <section className="app-container mb-80">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-600">Featured Products</h2>
        <Link
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 focus:text-blue-600"
          to="/collections/all"
        >
          <span>View All Products</span>
          <span>
            <AiFillCaretRight className="translate-y-[1px]" />
          </span>
        </Link>
      </div>
      <ProductCarousel products={products.nodes} />
    </section>
  );
};

export default FeaturedCollection;
