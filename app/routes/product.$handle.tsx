import {useLoaderData} from '@remix-run/react';
import {ShopPayButton} from '@shopify/hydrogen';
import {
  Product,
  SelectedOptionInput,
} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {useRef} from 'react';
import {getProduct} from '~/api/getProduct.server';
import {getProductRecommendations} from '~/api/getProductRecommendations.server';
import AddToCart from '~/components/AddToCart';
import Button from '~/components/Button';
import ProductImages from '~/components/ProductImages';
import ProductInfo from '~/components/ProductInfo';
import ProductVariants from '~/components/ProductVariants';
import ProductCarousel from '~/components/ProductsCarousel';
import {useElementWidth} from '~/hooks/useElementWidth';
import {useProductVariants} from '~/hooks/useProductVariants';

const Product: React.FC = () => {
  const {
    product,
    selectedOptionsFromParams,
    productRecommendations,
    storeDomain,
  } = useLoaderData<typeof loader>();

  const {availabilityStatus, selectOption, selectedVariant, selectedOptions} =
    useProductVariants(product as Product, selectedOptionsFromParams);

  const productInfoRef = useRef<HTMLDivElement | null>(null);
  const productInfoWidth = useElementWidth(productInfoRef);

  return (
    <section className="flex flex-col items-center">
      <div className="max-w-2xl px-4 py-16 mx-auto lg:px-0 sm:py-24 sm:px-6 lg:max-w-7xl ">
        <div className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
          <div>
            <ProductImages images={product.images} />
          </div>
          <div ref={productInfoRef} className="max-w-xl">
            <ProductInfo
              title={product.title}
              vendor={product.vendor}
              price={+(selectedVariant?.price?.amount || 0)}
              compareAtPrice={+(selectedVariant?.compareAtPrice?.amount || 0)}
              description={product.seo.description || product.description}
              availabilityStatus={availabilityStatus}
              selectedVariantTitle={selectedVariant?.title}
            />
            <div className="mt-6">
              <ProductVariants
                selectOption={selectOption}
                options={product.options}
                selectedOptions={selectedOptions}
              />
            </div>
            <div className="w-full my-8 space-y-4">
              {availabilityStatus === 'in stock' &&
              selectedVariant !== undefined ? (
                <>
                  <AddToCart variantId={selectedVariant.id} />
                  <ShopPayButton
                    variantIds={[selectedVariant.id]}
                    width={productInfoWidth ? `${productInfoWidth}px` : '100%'}
                    storeDomain={storeDomain}
                  />
                </>
              ) : (
                <>
                  <Button className="capitalize" disabled size="full">
                    {availabilityStatus}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="app-container">
        <h4 className="mb-4 text-2xl font-bold text-gray-600">
          You might also like
        </h4>
        <ProductCarousel products={productRecommendations} />
      </div>
    </section>
  );
};

export default Product;

export const loader = async ({params, context, request}: LoaderArgs) => {
  const handle = params.handle;
  if (!handle) {
    throw new Error();
  }

  const query = new URLSearchParams(request.url.split('?')[1]);

  const selectedOptionsFromParams = Array.from(query.entries()).map(
    ([name, value]) => ({
      name,
      value,
    }),
  ) as SelectedOptionInput[];
  const {product, storeDomain} = await getProduct({
    handle,
    context,
    selectedOptions: selectedOptionsFromParams,
  });

  const {productRecommendations} = await getProductRecommendations({
    context,
    productId: product.id,
  });
  return {
    product,
    selectedOptionsFromParams,
    productRecommendations,
    storeDomain,
  };
};
