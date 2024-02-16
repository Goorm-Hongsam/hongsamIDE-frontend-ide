import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { FC, HTMLProps } from 'react';

export const ToolTipVariants = cva(
  `rounded-md absolute text-sm bg-white p-1 w-24 text-center border border-main-color mb-16 z-50`,
  {
    variants: {
      background: {
        dark: 'bg-black text-white',
        ligth: 'bg-white',
      },
      position: {
        top: 'mb-16',
      },
    },
  },
);

interface ToolTipProps
  extends HTMLProps<HTMLParagraphElement>,
    VariantProps<typeof ToolTipVariants> {
  label: string;
}
const ToolTip: FC<ToolTipProps> = ({ label, background, ...props }) => {
  return <p className={cn(ToolTipVariants({ background }), { ...props })}>{label}</p>;
};
export default ToolTip;
