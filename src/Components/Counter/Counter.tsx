import React from "react";
import {
  DECREMENT,
  INCREMENT,
  useCountDispatch,
  useCountState,
} from "../../Contexts/Counter-context";
import { useUserEnvState } from "../../Contexts/UserEnv";

const Counter = () => {
  const counterState = useCountState();
  const dispatch = useCountDispatch();
  const { device } = useUserEnvState();

  // console.log(env);
  return (
    <div>
      <p style={{ color: device === "mobile" ? "red" : "black" }}>모바일 일경우 빨간색</p>
      <h1>{counterState.count}</h1>
      <button onClick={() => dispatch({ type: INCREMENT })}>+1</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>-1</button>
    </div>
  );
};

export default Counter;
