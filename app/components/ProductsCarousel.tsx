import Carousel from 'react-multi-carousel';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 4000, min: 1920},
    items: 5,
  },
  desktop: {
    breakpoint: {max: 1920, min: 1024},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 1024, min: 640},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 640, min: 0},
    items: 1,
  },
};

const ProductCarousel: React.FC<Props> = ({products}) => {
  return (
    <Carousel ssr={true} responsive={responsive}>
      {products.map((product) => (
        <div key={product.handle} className="px-4">
          <ProductCard product={product} />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
