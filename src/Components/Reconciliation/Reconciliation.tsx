/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

const Reconciliation: React.FC = ({ children }) => {
  console.log(children);
  return <div>{children}</div>;
};

const Counter = () => {
  const [number, setNumber] = React.useState(0);

  const increase = () => setNumber(number + 1);
  const decrease = () => setNumber(number - 1);

  const headLine = React.createRef();

  const $headlineNumber = React.createElement("h3", { key: "head-sangheon", ref: headLine }, number);
  const $plusButton = React.createElement("button", { onClick: increase }, "+1");
  const $minusButton = React.createElement("button", { onClick: decrease }, "-1");
  const $counterWrapper = React.createElement("div", { className: "Counter" }, $headlineNumber, $plusButton, $minusButton);

  React.useEffect(() => {
    console.log("h3 tag", $headlineNumber);
  }, [number]);

  return $counterWrapper;
};

const Counter2 = () => {
  const [number, setNumber] = React.useState(0);

  const increase = () => setNumber(number + 1);
  const decrease = () => setNumber(number - 1);

  const headLine = React.createRef();

  return (
    <div className="Counter">
      <h3 key="">{number}</h3>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
};

const Check = () => {
  return (
    <Counter />
    // <Counter2 />
    // <Reconciliation>
    //   {button}
    //   {/* <p>1</p>
    //   <h1>123</h1> */}
    // </Reconciliation>
  );
};

export default Check;
