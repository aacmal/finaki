import Placeholder from "../../Placeholder";
import React from "react";

type Props = {
  delay?: number;
};

const TextWithIconPlaceholder = (props: Props) => {
  return <Placeholder animationDelay={props.delay} className="w-full h-16" />;
};

export default TextWithIconPlaceholder;
