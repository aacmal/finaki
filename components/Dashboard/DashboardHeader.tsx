import Heading from "@/dls/Heading";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const DashboardHeader = ({ title, children }: Props) => (
  <div className="flex justify-between items-center px-3 mb-5">
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
