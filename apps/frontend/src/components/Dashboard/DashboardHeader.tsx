import Heading from "../dls/Heading";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const DashboardHeader = ({ title, children }: Props) => (
  <div className="mb-5 flex items-center justify-between px-3">
    <Heading fontWeight="medium" level={3}>
      {title}
    </Heading>
    {children && (
      <div role="contentinfo" className="dark:text-slate-300">
        {children}
      </div>
    )}
  </div>
);

export default DashboardHeader;
