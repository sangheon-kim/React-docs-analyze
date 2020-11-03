import React from "react";
import Child from "./Child";

const Parent: React.FC = () => {
  let ref1 = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    console.log((ref1 as any).onClick);
  }, []);
  return <Child ref={ref1} />;
};

export default Parent;
