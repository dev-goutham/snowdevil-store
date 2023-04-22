import {Link} from '@remix-run/react';
import {RefObject} from 'react';
import {useManipulateSearchParams} from '~/hooks/useManipulateSearchParams';
import {cx} from '~/utils/classNames';

interface Props {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  scrollTo?: RefObject<Element>;
}

const Pagination: React.FC<Props> = ({
  hasPreviousPage,
  hasNextPage,
  currentPage,
  scrollTo,
}) => {
  const {setNewParamsValue} = useManipulateSearchParams();

  const scrollToRef = () => {
    if (scrollTo) {
      scrollTo.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-between mx-auto mt-6 text-sm font-medium text-gray-700 "
    >
      <div className="flex-1 min-w-0">
        <Link
          to={`?page=${currentPage - 1}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToRef();
            setNewParamsValue('page', String(currentPage - 1));
          }}
          aria-disabled={!hasPreviousPage && currentPage <= 1}
          className={cx(
            'inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
            !hasPreviousPage && currentPage <= 1
              ? 'opacity-30 pointer-events-none'
              : '',
          )}
        >
          Previous
        </Link>
      </div>

      <div className="flex justify-end flex-1 min-w-0">
        <Link
          to={`?page=${currentPage + 1}`}
          aria-disabled={!hasNextPage}
          onClick={(e) => {
            e.preventDefault();
            scrollToRef();
            setNewParamsValue('page', String(currentPage + 1));
          }}
          className={cx(
            'inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
            !hasNextPage ? 'opacity-30 pointer-events-none' : '',
          )}
        >
          Next
        </Link>
      </div>
    </nav>
  );
};

export default Pagination;
