import React from "react";

import Placeholder from "../../Placeholder";

type Props = {
  delay?: number;
};

const TextWithIconPlaceholder = (props: Props) => {
  return <Placeholder animationDelay={props.delay} className="h-16 w-full" />;
};

export default TextWithIconPlaceholder;
