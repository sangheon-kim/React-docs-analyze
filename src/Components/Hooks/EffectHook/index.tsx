import React from "react";

const EffectHook: React.FC = () => {
  // 튜플 타입 명시
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);
  const [isVisible, setVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false as boolean);

  React.useEffect(() => {
    document.title = `you clicked ${count} times`;
  });

  return (
    <div className="EffectHook">
      <p style={{ color: isVisible ? "red" : "black" }}>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setVisible(!isVisible)} style={{ cursor: "pointer" }}>
        Font Color Change!!!
      </button>
    </div>
  );
};

export default EffectHook;
