import classNames from "classnames"

type HeadingTextProps = {
  children: React.ReactNode,
  className?: string,
  isBold?: boolean,
}

const Heading = ({ children, className, ...props }: HeadingTextProps) => {
  return (
    <h1
      {...props}
      className={classNames(
        'text-lg font-bold lg:text-xl text-gray-700',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export default Heading