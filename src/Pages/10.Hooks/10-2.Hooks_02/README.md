# 10.2 Hook 개요

## React.useState(State Hook)

```tsx
import React from "react";

const StateHook: React.FC = () => {
  // 튜플 타입 명시
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);

  return (
    <div className="StateHook">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default StateHook;
```

> 버튼을 클릭하면, 카운트가 하나씩 증가하는 예제

- `useState`는 현재의 state 값과 이 값을 업데이트 하는 함수를 쌍으로 제공한다.
