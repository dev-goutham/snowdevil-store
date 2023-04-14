import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import useCurrency from '~/hooks/useCurrency';
import {getDescription} from '~/utils/getDescription';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({product}) => {
  const amount = useCurrency(+product.priceRange.minVariantPrice.amount);

  return (
    <Link
      to={`/product/${product.handle}`}
      className="flex flex-col gap-4 p-4 border border-gray-200 shadow-md shrink-0"
    >
      <div className="flex items-center h-full">
        <Image
          className="block w-72"
          data={{
            url: product.featuredImage!.url,
            altText: product.featuredImage?.altText || '',
            height: 320,
            width: 320,
          }}
        />
      </div>
      <hr className="my-2" />
      <div className="flex flex-col w-72">
        <h3 className="mb-1 font-semibold text-gray-600">{product.title}</h3>
        <p className="mb-3 text-sm tracking-wider text-gray-500 line-clamp-3">
          {getDescription(product.description)}
        </p>
        <p className="text-lg font-semibold text-indigo-700">{amount}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
