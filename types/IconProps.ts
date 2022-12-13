export interface IconProps {
  className?: string | undefined; 
  fill?: string;
  height?: number;
  width?: number;
  stroke?: string;
  strokeWidth?: number;
}

export const defaultIconProps: IconProps = {
  className: undefined,
  fill: 'currentColor',
  height: 24,
  width: 24,
}