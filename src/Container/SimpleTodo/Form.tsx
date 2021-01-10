import React from "react";

type Props = {
  setRouter: React.Dispatch<React.SetStateAction<string>>;
};
const Form: React.FC<Props> = ({ setRouter }) => {
  return <div></div>;
};

export default React.memo(Form);
