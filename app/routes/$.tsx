import {Link} from '@remix-run/react';
import {MetaFunction} from '@shopify/remix-oxygen';
import {IoArrowBackOutline} from 'react-icons/io5';

const NotFound: React.FC = () => {
  return (
    <section className="container mt-40">
      <h1 className="text-3xl font-bold">
        The Page you are looking for does not exist
      </h1>
      <Link
        className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 focus:text-blue-700 text-semibold"
        to="/"
      >
        <span>
          <IoArrowBackOutline />
        </span>
        <span>Go back home</span>
      </Link>
    </section>
  );
};

export const meta: MetaFunction = () => ({
  title: 'Not Found',
});

export default NotFound;
