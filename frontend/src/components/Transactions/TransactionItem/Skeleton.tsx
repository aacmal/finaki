import Placeholder from "../../Placeholder";
import React from "react";

type Props = {
  delay?: number;
};

const SimpleTSkeleton = (props: Props) => {
  return <Placeholder animationDelay={props.delay} className="h-16" />;
};

export default SimpleTSkeleton;
