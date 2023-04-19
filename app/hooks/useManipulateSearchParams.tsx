import {useSearchParams} from '@remix-run/react';
import {useCallback} from 'react';

export const useManipulateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const appendToSearchParams = useCallback(
    (str: string) => {
      const [key, value] = Object.entries(JSON.parse(str))[0];
      searchParams.append(key, value as string);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const removeFromSearchParams = useCallback(
    (str: string | RegExp) => {
      const newQueryString = searchParams.toString().replace(str, '');
      setSearchParams(newQueryString);
    },
    [searchParams, setSearchParams],
  );

  const setNewParamsValue = useCallback(
    (key: string, value: string) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return {appendToSearchParams, removeFromSearchParams, setNewParamsValue};
};
