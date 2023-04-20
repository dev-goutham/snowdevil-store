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
  const compareAtPriceMin = +product.compareAtPriceRange.minVariantPrice.amount;
  const priceRangeMin = +product.priceRange.minVariantPrice.amount;
  const amount = useCurrency(priceRangeMin);
  const soldOut = !product.availableForSale;
  const isOnSale = priceRangeMin < compareAtPriceMin;
  console.log(product.title, product.availableForSale);
  return (
    <Link
      to={`/product/${product.handle}`}
      className="flex flex-col gap-4 p-4 border border-gray-200 shadow-md shrink-0"
    >
      <div className="flex items-center relative justify-center max-h-[410px] min-h-[410px]">
        {isOnSale && !soldOut && (
          <div className="absolute px-4 py-1 text-xs bg-green-300 bg-opacity-30 top-2 right-2 rounded-xl ">
            Sale
          </div>
        )}
        {soldOut && (
          <div className="absolute px-4 py-1 text-xs bg-black bg-opacity-30 top-2 right-2 rounded-xl ">
            Sold Out
          </div>
        )}

        <Image
          className="block hover:scale-110 w-72 max-h-[410px] object-cover transition-all duration-150 ease-in-out"
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
