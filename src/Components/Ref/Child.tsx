import React from "react";

type Props = {
  ref: React.RefObject<HTMLDivElement> | any;
  [key: string]: any;
};

const Child: React.FC<Props> = () => {
  return <div></div>;
};

// const Child: React.FC<Props> = React.forwardRef((props, ref: any) => {
//   const [number, setNumber] = React.useState(0);
//   console.log(Child);
//   const onClick = () => {
//     console.log("123");
//   };

//   return <div ref={ref}></div>;
// });

export default Child;
