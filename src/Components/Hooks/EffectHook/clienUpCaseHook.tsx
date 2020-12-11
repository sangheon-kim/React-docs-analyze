/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

const clienUpCaseHook = () => {
  const [displaySize, setDisplaySize] = React.useState({
    width: 0,
    height: 0,
  });

  const _eventCallback = (e: any) => {
    console.log("resize 이벤트 감지중");
    setDisplaySize({
      ...displaySize,
      width: e.target.innerWidth,
      height: e.target.innerHeight,
    });
  };

  React.useEffect(() => {
    setDisplaySize({
      ...displaySize,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener("resize", _eventCallback);

    return () => {
      window.removeEventListener("resize", _eventCallback);
    };
  }, []);

  const { width, height } = displaySize;
  return (
    <div>
      <h2>너비 : {width}</h2>
      <h2>높이 : {height}</h2>
    </div>
  );
};

export default clienUpCaseHook;
