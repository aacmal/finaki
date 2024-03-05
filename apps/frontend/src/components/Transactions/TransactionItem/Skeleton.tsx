import React from "react";

import Placeholder from "../../Placeholder";

type Props = {
  delay?: number;
};

const SimpleTSkeleton = (props: Props) => {
  return <Placeholder animationDelay={props.delay} className="h-16" />;
};

export default SimpleTSkeleton;
