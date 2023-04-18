import {Link} from '@remix-run/react';
import {cx} from '~/utils/classNames';

interface Props {
  numberOfPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const Pagination: React.FC<Props> = ({
  hasPreviousPage,
  hasNextPage,
  numberOfPages,
  currentPage,
}) => {
  console.log({hasPreviousPage, hasNextPage});

  let pages: (number | string)[] = [];

  if (numberOfPages <= 5) {
    pages = Array.from({length: numberOfPages}, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, '...', numberOfPages];
    } else if (currentPage < numberOfPages && currentPage < numberOfPages - 2) {
      pages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        numberOfPages,
      ];
    } else {
      pages = [1, '...', numberOfPages - 2, numberOfPages - 1, numberOfPages];
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-between mx-auto mt-6 text-sm font-medium text-gray-700 "
    >
      <div className="flex-1 min-w-0">
        <Link
          to={`?page=${currentPage - 1}`}
          aria-disabled={!hasPreviousPage}
          className={cx(
            'inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
            !hasPreviousPage ? 'opacity-30 pointer-events-none' : '',
          )}
        >
          Previous
        </Link>
      </div>
      <div className="hidden space-x-2 sm:flex">
        {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
        {pages.map((i, idx) => {
          if (Number.isInteger(i)) {
            return (
              <Link
                key={i}
                to={`?page=${i}`}
                className={cx(
                  'inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
                  currentPage === (i as number)
                    ? 'border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300'
                    : '',
                )}
              >
                {i}
              </Link>
            );
          } else {
            return (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={`${i}-${idx}`}
                className="inline-flex h-10 items-center px-1.5 text-gray-500"
              >
                ...
              </span>
            );
          }
        })}
      </div>
      <div className="flex justify-end flex-1 min-w-0">
        <Link
          to={`?page=${currentPage + 1}`}
          aria-disabled={!hasNextPage}
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
