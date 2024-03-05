import useStore from "../../../stores/store";
import IconWrapper from "../../dls/IconWrapper";
import LoadingSpinner from "../../dls/Loading/LoadingSpinner";
import ChevronIcon from "../../icons/ChevronIcon";
import Action from "./Action";

const ProfileInfo = () => {
  const { user } = useStore((state) => ({ user: state.user }));

  if (!user) return <LoadingSpinner />;
  return (
    <div className="group relative flex items-center gap-2">
      <span className="font-medium dark:text-slate-200">
        Hi, {user?.name.split(" ")[0]}
      </span>
      <IconWrapper className="w-5 text-gray-800 dark:text-slate-300">
        <ChevronIcon
          className=" transition-all group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      </IconWrapper>
      <Action />
    </div>
  );
};

export default ProfileInfo;
