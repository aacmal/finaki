export interface IconProps {
  className?: string | undefined; 
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export interface ArrowIconProps extends IconProps {
  direction: 'up' | 'down' | 'left' | 'right';
}

export const defaultIconProps: IconProps = {
  fill: 'currentColor',
}