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
      setSearchParams((prev) => {
        const newUrl = new URLSearchParams(prev.toString().replace(str, ''));
        return newUrl;
      });
    },
    [setSearchParams],
  );

  const setNewParamsValue = useCallback(
    (key: string, value: string) => {
      setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
      });
    },
    [setSearchParams],
  );

  return {appendToSearchParams, removeFromSearchParams, setNewParamsValue};
};
