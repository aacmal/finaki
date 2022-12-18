import classNames from "classnames"

type HeadingTextProps = {
  children: React.ReactNode,
  className?: string,
  isBold?: boolean,
  isItalic?: boolean,
  isUnderline?: boolean,
  defaultColor?: 'bright' | 'dark',
}

const Heading = ({ 
  children, 
  className, 
  defaultColor = 'dark',
  ...props 
}: HeadingTextProps) => {
  return (
    <h1
      {...props}
      className={classNames(
        'text-lg font-bold lg:text-xl text-gray-700',
        {"text-gray-700": defaultColor === 'dark'},
        {"text-gray-100": defaultColor === 'bright'},
        className,
      )}
    >
      {children}
    </h1>
  )
}

export default Heading