import {Link, useLoaderData} from '@remix-run/react';
import {AiFillCaretRight} from 'react-icons/ai';
import ProductCard from '~/components/ProductCard';
import {loader} from '~/routes';

const FeaturedCollection: React.FC = () => {
  const {
    indexQuery: {
      collection: {products},
    },
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <section className="app-container mb-80">
      <div className="flex justify-between">
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
      <div className="overflow-x-scroll h-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-600 scroll-smooth snap-x scrollbar-track-gray-200">
        <div className="flex gap-12 mt-8 mb-6 md:gap-24">
          {products.nodes.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
