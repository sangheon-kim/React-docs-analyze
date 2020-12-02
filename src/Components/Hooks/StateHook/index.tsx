import React from "react";

const StateHook: React.FC = () => {
  // 튜플 타입 명시
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);
  const [isVisible, setVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false as boolean);

  return (
    <div className="StateHook">
      <p style={{ color: isVisible ? "red" : "black" }}>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setVisible(!isVisible)} style={{ cursor: "pointer" }}>
        Font Color Change!!!
      </button>
    </div>
  );
};

export default StateHook;
