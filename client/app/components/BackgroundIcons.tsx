// components/BackgroundIcon.tsx

import React from 'react';
import { IconType } from 'react-icons';
import clsx from 'clsx';

interface Props {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';
  icon: IconType;
  size?: number;
  bgColor?: string;
  opacity?: number;
  className?: string;
  top?: string; // Custom top position
  bottom?: string; // Custom bottom position
  left?: string; // Custom left position
  right?: string; // Custom right position
}

const BackgroundIcon: React.FC<Props> = ({
  position,
  icon: IconComponent,
  size = 40,
  bgColor = 'bg-transparent',
  opacity = 25,
  className = '',
  top,
  bottom,
  left,
  right
}) => {
  // Calculate position based on the 'position' prop
  const positionClasses = clsx({
    'top-0 left-0': position === 'top-left',
    'top-0 right-0': position === 'top-right',
    'bottom-0 left-0': position === 'bottom-left',
    'bottom-0 right-0': position === 'bottom-right',
    'top-0': position === 'top' && !left && !right,
    'bottom-0': position === 'bottom' && !left && !right,
    'left-0': position === 'left' && !top && !bottom,
    'right-0': position === 'right' && !top && !bottom,
  });

  const customStyle = {
    top: top ? top : undefined,
    bottom: bottom ? bottom : undefined,
    left: left ? left : undefined,
    right: right ? right : undefined,
  };

  const opacityClass = `bg-opacity-${opacity}`;

  return (
    <div
      className={clsx(
        'absolute', // Position absolutely within its parent
        positionClasses,
        ` w-20 ${bgColor}`, // Background color class
        {
          'bg-opacity-0': opacity === 0,
          'bg-opacity-5': opacity === 5,
          'bg-opacity-10': opacity === 10,
          'bg-opacity-20': opacity === 20,
          'bg-opacity-25': opacity === 25,
          'bg-opacity-30': opacity === 30,
          'bg-opacity-40': opacity === 40,
          'bg-opacity-50': opacity === 50,
          'bg-opacity-60': opacity === 60,
          'bg-opacity-70': opacity === 70,
          'bg-opacity-75': opacity === 75,
          'bg-opacity-80': opacity === 80,
          'bg-opacity-90': opacity === 90,
          'bg-opacity-95': opacity === 95,
          'bg-opacity-100': opacity === 100,
        }, // Background opacity class
        'flex',
        'items-center',
        'justify-center',
        className
      )}
      style={customStyle}
    >
      <IconComponent className="text-black" size={size} fill='black' />
    </div>
  );
}

export default BackgroundIcon;
