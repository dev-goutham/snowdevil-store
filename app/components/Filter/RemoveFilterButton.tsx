import {useCallback, useMemo} from 'react';
import {GrFormClose} from 'react-icons/gr';
import {useManipulateSearchParams} from '~/hooks/useManipulateSearchParams';

interface Props {
  filter: string;
}

const RemoveFilterButton: React.FC<Props> = ({filter}) => {
  const {removeFromSearchParams, setNewParamsValue} =
    useManipulateSearchParams();

  console.log(JSON.parse(filter));

  const [key, value] = useMemo(
    () => Object.entries(JSON.parse(filter) as object)[0],
    [filter],
  );

  const handleClick = useCallback(() => {
    const str = `${key}=${value.split(' ').join('+')}`;
    setNewParamsValue('page', '1');
    removeFromSearchParams(str);
  }, [key, value, removeFromSearchParams, setNewParamsValue]);

  return (
    <span className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
      <span>{value as string}</span>
      <button
        type="button"
        className="inline-flex flex-shrink-0 translate-y-[1.05px] p-1 ml-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500"
        onClick={handleClick}
      >
        <span className="sr-only">Remove filter for {filter}</span>
        <GrFormClose className="w-4 h-4" />
      </button>
    </span>
  );
};

export default RemoveFilterButton;
