import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import useCurrency from '~/hooks/useCurrency';
import {getDescription} from '~/utils/getDescription';

interface Props {
  product: Product;
  size?: 'large' | 'medium' | 'small';
}

const ProductCard: React.FC<Props> = ({product}) => {
  const amount = useCurrency(+product.priceRange.minVariantPrice.amount);

  return (
    <Link
      to={`/product/${product.handle}`}
      className="flex flex-col gap-4 p-4 border border-gray-200 shadow-md shrink-0"
    >
      <div className="flex items-center justify-center max-h-[410px] min-h-[410px]">
        <Image
          className="block w-72 max-h-[410px] object-cover"
          data={{
            url: product.featuredImage!.url,
            altText: product.featuredImage?.altText || '',
            height: 410,
            width: 320,
          }}
        />
      </div>
      <hr className="my-2" />
      <div className="flex flex-col min-h-[128px] w-72">
        <h3 className="mb-1 font-semibold text-gray-600">{product.title}</h3>
        <p className="mb-3 text-sm tracking-wider text-gray-500 line-clamp-3">
          {product.seo.description || getDescription(product.description)}
        </p>
        <p className="text-lg font-semibold text-indigo-700">{amount}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
