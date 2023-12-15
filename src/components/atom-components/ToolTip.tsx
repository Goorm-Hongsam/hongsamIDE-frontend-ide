import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { FC, HTMLProps } from 'react';

export const ToolTipVariants = cva(
  `rounded-md fixed top-10 text-sm bg-white p-1 w-24 text-center border border-main-color`,
  {
    variants: {
      background: {
        dark: 'bg-black text-white',
        ligth: 'bg-white',
      },
    },
  },
);

interface ToolTipProps
  extends HTMLProps<HTMLParagraphElement>,
    VariantProps<typeof ToolTipVariants> {
  label: string;
  additionalClass?: string;
}
const ToolTip: FC<ToolTipProps> = ({ label, background, additionalClass }) => {
  return <p className={cn(ToolTipVariants({ background }), additionalClass)}>{label}</p>;
};
export default ToolTip;
