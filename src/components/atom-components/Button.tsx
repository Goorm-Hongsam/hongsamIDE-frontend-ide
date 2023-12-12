import React, { useEffect } from 'react';
interface ButtonProps {
  label: string;
  tooltipElement?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, tooltipElement }) => {
  const [isToolTip, setIsToolTip] = React.useState(false);
  useEffect(() => {
    if (isToolTip) {
      if (isToolTip) {
        setTimeout(() => {
          setIsToolTip(false);
        }, 2000);
      }
    }
  }, [isToolTip]);
  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={() => {
          if (onClick) {
            onclick;
          }
          setIsToolTip(!isToolTip);
        }}
        className='hover:text-main-color'
      >
        {label}
      </button>
      {isToolTip && tooltipElement}
    </div>
  );
};
export default Button;
