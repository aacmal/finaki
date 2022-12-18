export interface IconProps {
  className?: string | undefined; 
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface ArrowIconProps extends IconProps {
  direction: 'up' | 'down' | 'left' | 'right';
}

export const defaultIconProps: IconProps = {
  className: 'w-6',
  fill: 'currentColor',
}