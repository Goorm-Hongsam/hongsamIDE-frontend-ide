import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../utils/cn';

export const ButtonVariants = cva(
  `flex items-center justify-center hover:shadow-md hover:bg-main-color hover:text-white transition-all text-center relative py-1 px-2 rounded-md shadow-md`,
  {
    variants: {
      variant: {
        defalut: 'hover:shadow-md hover:bg-main-color text-white',
        main: 'bg-main-color hover:bg-main-dark-color text-white hover:text-white',
        alert: 'bg-red-400 hover:bg-red-700 text-white hover:text-white',
      },
      size: {
        rounded: 'w-7 h-7 rounded-full',
      },
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  label?: string;
  children?: React.ReactElement;
  additionalClass?: string;
}

const Button: FC<ButtonProps> = ({ variant, size, children, label, additionalClass, ...props }) => {
  return (
    <button className={cn(ButtonVariants({ variant, size }), additionalClass)} {...props}>
      {children && children}
      {label && label}
    </button>
  );
};

export default Button;
