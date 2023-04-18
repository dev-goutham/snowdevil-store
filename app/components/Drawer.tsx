import {Transition, TransitionClasses} from '@headlessui/react';
import {PropsWithChildren, Fragment, useEffect} from 'react';

type Props = PropsWithChildren &
  TransitionClasses & {
    open: boolean;
  };

const Drawer: React.FC<Props> = ({open, children, ...transitionClasses}) => {
  useEffect(() => {
    const app = document.querySelector('body');
    if (open) {
      app!.style.overflow = 'hidden';
    } else {
      app!.style.overflow = 'auto';
    }
  }, [open]);
  return (
    <Transition as={Fragment} appear {...transitionClasses}>
      {children}
    </Transition>
  );
};

export default Drawer;
