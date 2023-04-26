import {Product} from '@shopify/hydrogen/storefront-api-types';
import {Tab} from '@headlessui/react';
import {cx} from '~/utils/classNames';
import {Image} from '@shopify/hydrogen';

interface Props {
  images: Product['images'];
}

const ProductImages: React.FC<Props> = ({images}) => {
  return (
    <div>
      <Tab.Group as="div" className="flex flex-col-reverse ">
        <div className="hidden w-full max-w-2xl mx-auto mt-8 sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.nodes.map((image) => (
              <Tab
                key={image.id}
                className="cursor-pointer hover:bg-gray-50 focus:outline-none"
              >
                {({selected}) => (
                  <Image
                    data={{...image, width: 100, height: 100}}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                    className={cx(
                      'object-cover outline-none border-none focus:outline-none object-center ring-2 ring-offset-4 ring-opacity-70 rounded-md block ',
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                    )}
                  />
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="flex justify-center w-full">
          {images.nodes.map((image) => {
            const width = image.width!;
            const height = image.height!;

            const imageHeight = height * (350 / width);

            return (
              <Tab.Panel key={image.id}>
                <Image
                  style={{
                    width: '350px',
                    height: imageHeight,
                  }}
                  data={{...image, width: 350, height: imageHeight}}
                  className="object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductImages;
