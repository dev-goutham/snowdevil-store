import useCurrency from '~/hooks/useCurrency';
import {cx} from '~/utils/classNames';

interface Props {
  title: string;
  price: number;
  compareAtPrice: number;
  description: string;
  availabilityStatus: 'in stock' | 'out of stock' | 'unavailable';
  selectedVariantTitle: string | undefined;
}

const ProductInfo: React.FC<Props> = ({
  price,
  title,
  compareAtPrice,
  description,
  availabilityStatus,
  selectedVariantTitle,
}) => {
  const priceAmount = useCurrency(price);
  const compareAtPriceAmount = useCurrency(compareAtPrice);

  return (
    <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-700">
          <span className="block">{title}</span>
          {selectedVariantTitle ? (
            <span className="block mt-[2px]">{selectedVariantTitle}</span>
          ) : (
            <span className="block mt-[2px]">-</span>
          )}
        </h1>
        <div>
          <span
            className={cx(
              availabilityStatus === 'in stock'
                ? 'bg-green-200 rounded-xl border border-green-500 text-green-800'
                : availabilityStatus === 'out of stock'
                ? 'bg-red-200 rounded-xl border border-red-500 text-red-800'
                : 'bg-gray-200 rounded-xl border border-gray-500 text-gray-800',
              'px-4 py-1 scale-90',
            )}
          >
            {availabilityStatus}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>

        <div className="text-3xl tracking-tight text-gray-900">
          {availabilityStatus !== 'unavailable' ? (
            price < compareAtPrice ? (
              <p>
                <span className="inline-block mr-2 line-through opacity-75">
                  {compareAtPriceAmount}
                </span>
                <span>{priceAmount}</span>
              </p>
            ) : (
              <p>
                <span>{priceAmount}</span>
              </p>
            )
          ) : (
            '-'
          )}
        </div>

        <p className="mt-2 tracking-wider">{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
