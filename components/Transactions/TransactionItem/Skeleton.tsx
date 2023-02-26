import Placeholder from "@/components/Placeholder";
import React from "react";

type Props = {
  delay?: number;
};

const SimpleTSkeleton = (props: Props) => {
  return <Placeholder animationDelay={props.delay} className="h-14" />;
};

export default SimpleTSkeleton;
