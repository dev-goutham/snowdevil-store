import {useState, useEffect} from 'react';

const useIsShowing = () => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(true);
    return () => {
      setIsShowing(false);
    };
  }, []);

  return isShowing;
};

export default useIsShowing;
