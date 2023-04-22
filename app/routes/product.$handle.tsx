import {useLoaderData} from '@remix-run/react';
import {
  Product,
  SelectedOptionInput,
} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {getProduct} from '~/api/getProduct.server';
import {getProductRecommendations} from '~/api/getProductRecommendations.server';
import Button from '~/components/Button';
import ProductCard from '~/components/ProductCard';
import ProductImages from '~/components/ProductImages';
import ProductInfo from '~/components/ProductInfo';
import ProductVariants from '~/components/ProductVariants';
import ProductCarousel from '~/components/ProductsCarousel';
import {useProductVariants} from '~/hooks/useProductVariants';

const Product: React.FC = () => {
  const {product, selectedOptionsFromParams, productRecommendations} =
    useLoaderData<typeof loader>();

  const {availabilityStatus, selectOption, selectedVariant, selectedOptions} =
    useProductVariants(product as Product, selectedOptionsFromParams);

  return (
    <section className="flex flex-col items-center">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div>
            <ProductImages images={product.images} />
          </div>
          <div className="max-w-md">
            <ProductInfo
              title={product.title}
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
            <div className="my-8">
              <Button disabled={availabilityStatus !== 'in stock'} size="full">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="app-container">
        <h4 className="mb-4 text-2xl font-bold text-gray-600">
          You might also like
        </h4>
        {/* <div className="flex gap-6">
          {productRecommendations.map((recommendedProduct) => (
            <ProductCard
              key={recommendedProduct.handle}
              product={recommendedProduct}
            />
          ))}
        </div> */}
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
  const product = await getProduct({
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
  };
};
