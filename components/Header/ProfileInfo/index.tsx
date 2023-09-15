import IconWrapper from "@/dls/IconWrapper";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import ChevronIcon from "@/icons/ChevronIcon";
import useStore from "../../../stores/store";
import Action from "./Action";

const ProfileInfo = () => {
  const { user } = useStore((state) => ({ user: state.user }));

  if (!user) return <LoadingSpinner />;
  return (
    <div className="flex gap-2 items-center relative group">
      <span className="font-medium dark:text-slate-200">
        Hi, {user?.name.split(" ")[0]}
      </span>
      <IconWrapper className="text-gray-800 dark:text-slate-300 w-5">
        <ChevronIcon
          className=" group-hover:rotate-180 transition-all"
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
