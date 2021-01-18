# Hooks API

## 기본 Hook

### useState

```tsx
const [state, setState] = useState(initialState);
```

- 상태 유지 값과 그 값을 갱신하는 함수를 반환합니다.
- 최초로 렌더링을 하는 동안, 반환된 state(state)는 첫 번째 전달된 인자(initialState)의 값과 같습니다.
- `setState`함수는 state를 갱신할 떄 사용합니다. 새 state 값을 받아 컴포넌트 리렌더링을 큐에 등록한다.

```tsx
setState(newState);
```

> 반환받은 첫 번째 값은 항상 갱신된 최신 STATE가 된다.

```md
## 주의

위 예제에서 setState 함수 동일성이 안정적이고 리렌더링 시에도 변경되지 않을 것이라는 것을 보장한다.
이것이 useEffect나 useCallback 의존성 목록에 해당 함수를 포함하지 않아도 무방한 이유다.
```

`함수적 갱신`

- 이전 state를 사용해서 새로운 state를 계산하는 경우 함수를 `setState`로 전달할 수 있다. 해당 함수는 이전 값을 받아 갱신된 값을 반환할 것이다. 여기에 `setState`의 양쪽 형태를 사용한 카운터 컴포넌트의 예가 있다.

```jsx
import React from "react";

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <React.Fragment>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </React.Fragment>
  );
}
```

> +와 -버튼은 함수 형식을 사용하고 있다. 이것은 갱신된 값이 갱신되기 이전의 값을 바탕으로 계산되기 떄문이다. 반면 "Reset" 버튼은 카운트를 항상 0으로 설정하기 때문에 일반적인 형식을 사용한다.

- 업데이트 함수가 현재 상태와 정확히 동일한 값을 반환한다면 바로 뒤에 일어날 리렌더링은 완전히 건너뛰게 된다.

`지연 초기 state`

- initialState 인자는 초기 렌더링 시에 사용하는 state이다. 이후 렌더링 시에는 이 값은 무시된다. state가 고비용 계산의 결과라면, 초기 렌더링 시에만 실행될 함수를 대신 제공할 수 있다.

```jsx
const [state, setState] = useState(() => {
  const initialState = func(props);
  return initialState;
});
```

> 초기 렌더링 시에만 실행될 함수를 대신해서 제공할 수 있다.

`state 갱신의 취소`

- State Hook을 현재의 state와 동일한 값으로 갱신하는 경우 React는 자식을 렌더링 한다거나 무엇을 실행하는 것을 회피하고 그 처리를 종료합니다. (Object.is 비교 알고리즘을 사용한다.)
- 실행 회피 전에 React에서 특정 컴포넌트를 다시 렌더링하는 것이 여전히 필요할 수도 있다는 것에 주의하자. 만약 렌더링 시에 고비용의 계산을 하고 있다면 useMemo를 사용하여 그것들을 최적화할 수 있다.

`Object.is`

```js
const obj = {};

const func1 = () => null;
const func2 = () => null;

console.log(0 === 0); // true
console.log("" === ""); // true
console.log(true === true); // true
console.log(undefined === undefined); // true
console.log(NaN === NaN); // false
console.log(null === null); // true
console.log([] === []); // false
console.log(func1 === func2); // false
console.log({} === {}); // false
console.log(obj === obj); // false

console.log("\n");

console.log(Object.is(0, 0)); // true
console.log(Object.is("", "")); // true
console.log(Object.is(true, true)); // true
console.log(Object.is(undefined, undefined));
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(null, null)); // true
console.log(Object.is([], [])); // false
console.log(Object.is(func1, func2)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is(obj, obj)); // true
```

> 보면 알겠지만 원시타입의 경우 값을 대상으로 비교하지만, 객체 타입인 경우에는 얕은 비교를 한다 결국 메모리 주소가 다르다면 false가 나올 것이다. 객체와, 배열, 함수가 객체타입이라고 생각하면 된다. 빈 객체를 {} 객체리터럴을 이용해서 만들어도, 서로 다른 메모리 공간에 할당된다. 그렇기에 서로 같지 않다고 나오는 것이다.
> `Object.is를 사용하면 NaN(Not a Number) 끼리는 같다고 값비교가 된다.`

### useEffect

- 명령형 또는 어떤 effect를 발생하는 함수를 인자로 받게 됩니다. 변형 구독, 타이머, 로깅 또는 다른 Side Effect는 함수 컴포넌트의 본문 안에서는 허용되지 않습니다. 이를 수행시 버그 및 UI 불일치를 야기하게 될 것이다.
- useEffect를 사용하도록 하자. useEffect에 전달된 함수는 화면에 렌더링이 완료된 후에 수행되게 될 것 입니다.
- 기본적으로 모든 동작은 모든 렌더링이 완료된 후에 수행하지만, 어떤 값이 변경되었을 때만 실행되게 할 수도 있다.

> 자세한 설명은 제가 이전에 설명한 Effect Hook을 다룬 내용을 참고해보시면 좋을 것 같습니다.

### useContext

```tsx
const value = useContext(MyContext);
```

- context 객체(React.createContext에서 반환된 값)을 받아 그 context의 현재 값을 반환한다.
- context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 가장 가까이에 있는 value를 prop에 의해 결정된다.
- 컴포넌트에서 가장 가까운 <MyContext.Provider>가 갱신되면 이 Hook은 그 MyContext provider에게 전달된 가장 최신의 context `value`를 사용하여 렌더러를 트리거 한다. 상위 컴포넌트에서 `React.memo` 또는 `shouldComponentUpdate`를 사용하더라도 `useContext`를 사용하고 있는 컴포넌트 자체에서부터 다시 렌더링된다.

`useContext`로 전달한 인자는 context 객체 그 자체 이어야 한다.

- useContext를 호출한 컴포넌트가 context 값이 변경되면 항상 리렌더링 될 것이다. 만약 컴포넌트를 리렌더링 하는 것에 비용이 많이 든다면, <a href="https://github.com/facebook/react/issues/15156#issuecomment-474590693">메모이제이션</a>을 사용하여 최적화하자.

> context에 대한 자세한 설명은 12장에서 설명하고 있으니 12장을 보고 해당 설명들을 보도록하자:)

## 추가 Hook

### useReducer

```js
const [state, dispatch] = React.useReducer(reduce, initialArg, init);
```

- `useState`의 대체 함수다. (state, action) => `newState`의 형태로 reducer를 받고 `dispatch` 메서드와 짝의 형태로 현재 state를 반환한다. (만약 redux에 익숙하다면 해당 동작이 어떻게 되는지 이미 알고 있을 것이다.)
-
