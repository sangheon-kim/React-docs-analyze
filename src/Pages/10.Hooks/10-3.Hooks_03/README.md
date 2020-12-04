# Effect Hooks

- 함수 컴포넌트에서 side Effect를 수행할 수 있다.

```tsx
import React from "react";

const EffectHook: React.FC = () => {
  // 튜플 타입 명시
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);
  const [isVisible, setVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false as boolean);

  React.useEffect(() => {
    // 리렌더링이 이루어질때마다 갱신
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
```

![](img/EffectHook1.gif)

> 이전에 State 훅을 사용할때 사용하던 예시에서 `useEffect를 사용했다. useEffect는 컴포넌트 안에서 sideEffect를 사용할 수 있어 useEffect라고 명명한것 같다.

`side Effect`

- 데이터 가져오기, Subscription 설정하기, 수동으로 리액트 컴포넌트의 DOM을 수정하는 것 모두가 side Effect라고 부른다.

<span style="color: red;">팁</span>

- 리액트의 class 생명주기 메서드에 친숙하다면, useEffec를 `componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`가 합쳐진 것으로 생각하면 좋다.

- 리액트 컴포넌트에서 사이드이펙트는 정리가 필요한 것과 그렇지 않은 것 두가지로 나뉘는데 이 두가지를 구분하는 것을 알아보자.

### 정리를 이용하지 않는 Effects

- 리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있다. 예를 들어 네트워크 요청(서버에 데이터 요청 등), DOM 조작, 로그 기록 등은 정리가 필요가 엇다.
- 그렇다면 class와 Hook이 서로 이런 이펙트를 어떻게 다르게 구현하는지 보자

`클래스 컴포넌트`

- `componentDidMount` - 마운트가 일어난 시점
- `componentDidUpdate` - State나 Props에 변화가 일어났을때 발생한다.

```tsx
import * as React from "react";

interface IState {
  count: number;
  isVisible: boolean;
}
interface IProps {}

class ClassEffect extends React.Component<IProps> {
  state: IState;
  constructor(props: IProps) {
    super(props);

    this.state = {
      count: 0,
      isVisible: false,
    };
  }

  componentDidMount() {
    // 컴포넌트가 마운트된 시점에 발생
    document.title = `You Clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    // 컴포넌트가 업데이트될때에 발생한다.
    document.title = `You Clicked ${this.state.count} times`;
  }

  render() {
    const { count, isVisible } = this.state;
    return (
      <div className="StateHook">
        <p style={{ color: isVisible ? "red" : "black" }}>You clicked {count} times</p>
        <button onClick={() => this.setState({ count: count + 1 })}>Click me</button>
        <button onClick={() => this.setState({ isVisible: !isVisible })} style={{ cursor: "pointer" }}>
          Font Color Change!!!
        </button>
      </div>
    );
  }
}

export default ClassEffect;
```

> 중복코드가 일어난다.

- componentDidMount, componentDidUpdate 서로 역할도 다르지만, 클래스 컴포넌트에서는 두가지 개념을 포함하고 있는 그런 기능을 제공하지는 않는다. 현재 예시에서는 마운트된 시점에도, 그리고 상태가 업데이트될때 마다 title갱신을 해줘야하지만, 아쉬운 부분이긴하다.
