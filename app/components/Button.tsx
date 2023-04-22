import {ComponentProps} from 'react';
import {cx} from '~/utils/classNames';

interface Props extends ComponentProps<'button'> {
  impact?: 'bold' | 'light' | 'none';
  size?: 'large' | 'medium' | 'small' | 'full';
  shape?: 'square' | 'rounded' | 'pill';
  tone?: 'default' | 'danger' | 'success';
  className?: string;
}

const baseClasses = `font-semibold focus-visible:outline-none focus-visible:ring-2 ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:shadown-none`;

const impactAndToneClasses: Record<
  NonNullable<Props['tone']>,
  Record<NonNullable<Props['impact']>, string>
> = {
  default: {
    bold: 'bg-indigo-600 hover:bg-indigo-700  text-white focus-visible:ring-indigo-700',
    light:
      'bg-indigo-200 text-indigo-600 hover:bg-indigo-300  focus-visible:ring-indigo-700',
    none: 'text-indigo-600 bg-transparent hover:bg-indigo-300 focus-visible:ring-indigo-700',
  },
  danger: {
    bold: 'bg-red-600 hover:bg-red-700  text-white focus-visible:ring-red-700',
    light:
      'bg-red-200 text-red-600 hover:bg-red-300  focus-visible:ring-red-700',
    none: 'text-red-600 bg-transparent hover:bg-red-300 focus-visible:ring-red-700',
  },
  success: {
    bold: 'bg-green-600 hover:bg-green-700  text-white focus-visible:ring-green-700',
    light:
      'bg-green-200 text-green-600 hover:bg-green-300  focus-visible:ring-green-700',
    none: 'text-green-600 bg-transparent hover:bg-green-300 focus-visible:ring-green-700',
  },
};

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  small: 'px-3 py-2 text-sm',
  medium: 'px-5 py-3 text-base',
  large: 'px-7 py-3 text-lg',
  full: 'w-full px-7 py-3 text-lg',
};

const roundedClasses: Record<NonNullable<Props['shape']>, string> = {
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

const Button: React.FC<Props> = ({
  impact = 'bold',
  size = 'medium',
  shape = 'rounded',
  tone = 'default',
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(
        baseClasses,
        impactAndToneClasses[tone][impact],
        sizeClasses[size],
        roundedClasses[shape],
        className,
      )}
    />
  );
};

export default Button;
