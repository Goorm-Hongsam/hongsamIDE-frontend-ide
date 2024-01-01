import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../utils/cn';

export const ButtonVariants = cva(
  `flex items-center justify-center hover:text-main-color transition-all text-center relative p-1`,
  {
    variants: {
      variant: {
        main: 'bg-main-color shadow-md',
        white: 'bg-white',
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
