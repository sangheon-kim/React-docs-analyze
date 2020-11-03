# 리액트에서 적절한 리액트 컴포넌트를 사용을 위한 차이를 알아보자.

> Let's look at the differences for using the appropriate react components in the reacts.

## Written by. Sangheon Kim(ksj8367@gmail.com)

## 사전 지식

- extends(클래스형 컴포넌트)
- 얕은 비교와 깊은 비교에 대한 이해
- 리렌더링

### extends

- 슈퍼클래스로부터 private으로 접근지정이 되어있지 않는 프로퍼티와 메소드를 상속받아 사용할 수 있습니다.

### 얕은 비교와 깊은 비교

- 숫자나 문자같은 원시타입의 경우 값을 비교한다.
- Object 타입(배열, 함수, 객체)
- 얕은 비교(shallow compare) - reference(쉽게 설명하면 메모리주소의 변경을 비교)만을 비교하게됩니다. 값이 재할당 되면, 메모리의 주소가 변경되기에 이전과 다른것으로 판단한다.
- 깊은 비교 - 객체 내부에 프로퍼티와 값까지도 비교하는 것을 깊은 비교라고 한다.

```javascript
this.state = {
  testObject: {
    count: 1,
  },
};
this.setState({ testObject: { count: 1 } }); // 얕은 비교로 하게되면 이전과 같지 않은것으로 판단한다.(변경으로 판단)
this.setState({ testObject: this.state.testObject }); // 얕은 비교를 해도 같은 것으로 판단한다. (별도의 객체리터럴로 가져오는 것이 아닌 메모리주소에서 가져온값을 그대로 넣기에 변경이 없는 것으로 간주)
```

### 리렌더링

- 리렌더링이란 렌더링(화면에 그려주는 것)을 다시 해줌으로서, 현재 컴포넌트를 다시 화면에 그려주는 것이다.
- 화면에 나타내주는 props나 state에 대한 부분에 대한 변경이 이루어져서 최신에 대한 정보를 보여줄 필요가 없을때 리렌더링이 발생을 하게되면 리렌더링이 발생할 때마다 Reflow (레이아웃을 재계산), Repaint(렌더트리를 재생성한것을 화면에 다시 그려주는 것)으로 인해 브라우저에 악영향을 줄 수 있다. 불필요한 리렌더링을 막아주는 것 또한 성능 개선의 필요한 항목중 하나다.

### 각 컴포넌트 별로 설명을 보기전에 App.tsx의 구성을 한번 보자

> 예제 프로젝트 구성

- App컴포넌트안에 PureComponentClass, Hooks, ReactComponentClass라는 컴포넌트들을 넣어놓았고, 부모 컴포넌트의 리렌더링을 발생시키기위해 간단한 카운터를 넣어놓았다.
- 이 프로젝트를 기반으로 화면 캡처를 통해서 어떤 변화들이 있는지 보여줄 예정이다.

```tsx
import React from "react";
import PureComponentClass from "./Components/ComponentType/PureComponent";
import "./App.css";
import Hooks from "./Components/ComponentType/Hooks";
import ReactComponentClass from "./Components/ComponentType/ReactComponent";

import React from "react";
import PureComponentClass from "./Components/ComponentType/PureComponent";
import "./App.css";
import Hooks from "./Components/ComponentType/Hooks";
import ReactComponentClass from "./Components/ComponentType/ReactComponent";

function App() {
  const [count, setCount] = React.useState(0);

  console.log("App Component Render");
  return (
    <div className="App">
      부모 컴포넌트 리렌더링 발생으로 자식컴포넌트 렌더링 확인
      <br />
      {count}
      <button
        onClick={() => {
          console.log("App컴포넌트 1증가");
          setCount(count + 1);
        }}
      >
        +1(App.tsx)
      </button>
      <button
        onClick={() => {
          console.log("App컴포넌트 1증가");
          setCount(count + 1);
        }}
      >
        -1(App.tsx)
      </button>
      <PureComponentClass />
      <Hooks />
      <ReactComponentClass />
    </div>
  );
}

export default App;
```

## React.PureComponent(pureComponent)

- 부모 컴포넌트의 리렌더링 여부와 상관없이 기본적으로 shouldComponentUpdate가 내장되어 있어서, 자신 컴포넌트의 state와 자신이 받고 있는 props가 변경되었을 때 리렌더링을 발생시킵니다. (하지만, 얕은 비교를 하고 있어서, 위에서 설명한 것처럼 Object타입에 객체리터럴 형식으로 직접 넣어주게되면 변경으로 감지되어 리렌더링 발생)
- 라이프 사이클 메소드를 제공해주지 않는다. state를 제어하거나, props를 받아서 처리해주는 단순한 컴포넌트 생성에 쓰면 좋을 것 같다.

```tsx
import * as React from "react";

interface OwnProps {}

interface OwnState {
  test: number;
  testObject: { count: number };
}

type Props = OwnProps & OwnState;

/**
 *
 * @description pure Component
 * @summary 부모 컴포넌트의 리렌더링 여부와 상관없이 props와 state가 변경시에만 리렌더링
 * @tutorial Hooks의 React.memo를 사용하거나 Class형
 * 컴포넌트에서 ShouldComponentUpdate에 default를 false하고
 * 특정 프롭스나 스테이트 변경시에만 true리턴과 유사
 * @export
 * @class PureComponentClass
 * @extends {React.PureComponent}
 */
export default class PureComponentClass extends React.PureComponent {
  state: Props;
  constructor(props: Props) {
    super(props);

    this.state = {
      test: 100,
      testObject: {
        count: 1,
      },
    };
  }

  render() {
    console.log("React.PureComponent render");
    return (
      <div>
        퓨어 컴포넌트 {this.state.test}
        <br />
        {/* primitive 타입의 경우 값의 변경이 일어날때만 변경 */}
        <button onClick={() => this.setState({ test: 100 })}>primitive Type 렌더링 체크(Pure Component)</button>
        {/* object타입의 경우 reference만 확인하기때문에 {} 과 {}도 다르기에 리렌더링 발생 */}
        {/* <button onClick={() => this.setState({testObject: this.state.testObject})}> */}
        <button onClick={() => this.setState({ testObject: { count: 1 } })}>Object Type 렌더링 체크(Pure Component)</button>
      </div>
    );
  }
}
```

## React.Component(Class Component)

- Pure Component와 마찬가지로, Class형 컴포넌트로 정의 해주어야한다. 하지만 Pure Component와 다르게, 다양한 라이프 사이클 메서드(component)를 제공해준다.
- 라이프 사이클 메서드에 대해서는 다음에 설명을 하는 것으로 하고, pureComponent는 제공 해주지 않는 다양한 라이프 사이클 메서드를 제공해준다 정도로 이해하고 넘어가도록 하자.
- pureComponent와 달리, React.Component를 상속받은 클래스형 컴포넌트의 경우에는 shouldComponentUpdate를 지정하여 별도의 리렌더링을 막아주지 않는 다면, 리액트의 리렌더링 조건에 부합하는 모든 경우에 리렌더링이 발생하게 된다. 대표적으로 어떤 경우가 있는지 보자.
  > 리액트 컴포넌트에서 별도의 리렌더링을 막지 않는 이상. 리렌더링이 발생하는 대표적인 3가지 경우
  >
  > > 1.  자신이 갖고 있는 state가 변경된 경우
  > > 2.  자신이 상위 컴포넌트로 부터 전달받고 있는 props가 변경되는 경우
  > > 3.  부모 컴포넌트가 리렌더링 되는 경우
- 자, 1,2는 화면에 항상 최신의 결과를 보여주기 위해서는 아마 개발자 자신도 원하는 경우일 것이다. 하지만 3번의 경우에는 부모 컴포넌트가 변경되었다고 해서 자식 컴포넌트에서 화면에 렌더해주고 있는 요소에 대한 변경이 없는데 굳이 불필요한 리렌더링이 발생한다면 어떨까? 그것은 바로 쓸데없는 자원 낭비가 아닐까 생각한다.
- 물론 부모컴포넌트가 리렌더링 될떄 리렌더링이 되어야 하는 경우에는 별도의 리렌더링을 막아줄 필요는 없을 것 이다. (용도에 따라 잘 사용하자)
- pureComponent가 부모 컴포넌트 리렌더링과 상관없이 자신이 가진 props와 state 변경이 되지 않는 이상 리렌더링을 하지 않았던 이유는 pureComponent는 자체적으로 shouldComponent를 가지고 있고 내부적으로 동작하고 있다.
- 하지만, React.Component를 상속해준 클래스형 컴포넌트는 개발자에게 다양한 라이프 사이클 메서드를 제공해준다. 이것은 다시 말하면, 개발자에게 모든 선택지를 제공해 준 것이다. shouldComponentUpdate를 제공은 해주지만, 따로 개발자가 세팅하지 않는다면, 위에서 설명한 리렌더링 현상은 계속 발생할 것이다.
- 자 그러면 오로지 리렌더링 관점에서만 설명을 한다면, 과연 pureComponent보다 더 디테일한 처리를 할 수 있는 이 컴포넌트는 뭐가 더 좋다는 것이며, 어떻게 정의 해주어야 할지 코드를 보자

```tsx
import * as React from "react";

interface OwnProps {}

interface OwnState {
  test: number;
  testObject: { count: number };
}

type Props = OwnProps & OwnState;

export default class ReactComponentClass extends React.Component {
  state: Props;
  constructor(props: Props) {
    super(props);

    this.state = {
      test: 100,
      testObject: {
        count: 1,
      },
    };
  }

  /**
   *
   * props는 디테일하게 비교해야 리렌더링이 발생하지 않는다. props와 nextProps만 비교하게되면
   * {}와 {}를 비교하기에 무조건 다르다고 나와서 리렌더링이 빌생한다.
   * 단지 얕은 복사에 대한 부분을 막을 수 있다.
   * (props객체와 state객체에 내부 프로퍼티의 값을 비교해서 처리가 가능)
   * 따라서 리렌더링에 대한 디테일한 부분까지 생각한다면, class형 컴포넌트의 scu를 활용하자
   *
   */
  shouldComponentUpdate(nextProps: Props, nextState: Props) {
    const { state, props } = this;

    // 분기를 싫어해도 이번 설명을 위해서라도 눈한번 감고 잘 봐주시길...
    if (state !== nextState) {
      // state안에 test와 다음 state의 test값을 비교하고 바뀌었을때 리렌더링을 시켜주는 구문이다.
      if (this.state.test !== nextState.test) {
        return true;
      }
      // state안에 testObject프로퍼티 안에 count 프로퍼티의 값을 비교한다. 다음 state안에 testObject프로퍼티 안에 count프로퍼티의 값의 변경을 확인해서 변경일 경우 리렌더링
      if (this.state.testObject.count !== nextState.testObject.count) {
        return true;
      }
    }

    return false;
  }

  render() {
    console.log("React컴포넌트 렌더링");
    return (
      <div>
        리액트 컴포넌트 {this.state.test}
        <br />
        {/* primitive 타입의 경우 값의 변경이 일어날때만 변경 */}
        <button onClick={() => this.setState({ test: 100 })}>primitive Type 렌더링 체크(Pure Component)</button>
        {/* object타입의 경우 reference만 확인하기때문에 {} 과 {}도 다르기에 리렌더링 발생 */}
        {/* <button onClick={() => this.setState({testObject: this.state.testObject})}> */}
        <button onClick={() => this.setState({ testObject: { count: 1 } })}>Object Type 렌더링 체크(Pure Component)</button>
      </div>
    );
  }
}
```

- 자 pureComponent와 달리 shouldCOmponentUpdate를 직접 정의 해준다. shouldComponentUpdate에서 false를 리턴해주는 경우에는 리렌더링이 발생하지 않는다. props는 따로 안받고 있기에 따로 분기를 하지는 않았다.
  > 조금더 자세하게 보기위해 차이가 있는 scu만 긁어봤다.
  >
  > > scu는 nextProps, nextState를 가지고 처리할 수 있다. 변경 후의 스테이트와 프롭스값을 가지고 분기를 칠 수 있다.

```tsx
shouldComponentUpdate(nextProps:Props, nextState:Props) {
    const { state, props } = this;

    // 분기를 싫어해도 이번 설명을 위해서라도 눈한번 감고 잘 봐주시길...
    if (state !== nextState) {
      // state안에 test와 다음 state의 test값을 비교하고 바뀌었을때 리렌더링을 시켜주는 구문이다.
      if (this.state.test !== nextState.test) {
        return true;
      }
      // state안에 testObject프로퍼티 안에 count 프로퍼티의 값을 비교한다. 다음 state안에 testObject프로퍼티 안에 count프로퍼티의 값의 변경을 확인해서 변경일 경우 리렌더링
      if (this.state.testObject.count !== nextState.testObject.count) {
        return true;
      }

    }

    return false;
  }
```

- 위 코드 처럼 class형 컴포넌트에서는 특정 상황이 있을때만 리렌더링을 시켜줄 수 있고, pureComponent와는 달리 객체 내부에 프로퍼티안에 또 객체가 있어도 디테일한 값 비교를 할 수 있다는 것이 매력포인트라고 생각한다. 하지만, pureComponent와는 달리 변경되어야하는 부분에 대해서 변경 처리를 안해주었다가... 개발 하다가 어 왜 안바뀌지? 하면서 컴퓨터와 눈싸움을 하는 수가 있을 수 있다. 그리고 모든 변경처리에 대한 부분들을 써주어야한다는 것도 귀찮음을 동반한다.

## Function Component (Hooks)

- 자 요즘은 아니고, 그나마 리액트 내부에서 가장 최신 기술인 Hooks라고도 많이 불리고 그것을 사용하기 위한 Function Component(함수 컴포넌트)는 위에서 정의한 클래스형 컴포넌트와 어떤 차이가 있으며, 위에서 말한 것들을 어떻게 구현할 수 있으며 리렌더링에대한 제어를 어떻게 할까? 한번 알아보자.

- 자 첫번째로 함수 컴포넌트는 라이프사이클 메서드를 좀 더 간소화 시켜 사용자가 이해하기 쉽고 사용하기 편하게 제공을 해준다. Hooks의 대표적인 내장함수로 (useEffect, useMemo, useState, useCallback, memo, ... 등) 하지만 Hooks API는 별도로 나중에 따로 다루도록 하겠다. 오늘은 리렌더링에 대한 성능 개선을 위한 Hooks인 memo 대해서 한번 봅시다.
  > 코드를 살펴 보자

```tsx
import * as React from "react";

const Hooks: React.FC = () => {
  const [count, setCount] = React.useState(100);
  const [_, setTestObject] = React.useState({ count: 1 });

  console.log("Function Component Render");
  return (
    <div>
      훅스 컴포넌트
      {count}
      <br />
      {/* primitive 타입의 경우 값의 변경이 일어날때만 변경 */}
      <button onClick={() => setCount(100)}>primitive Type 렌더링 체크(Hooks (Function Component))</button>
      {/* object타입의 경우 reference만 확인하기때문에 {} 과 {}도 다르기에 리렌더링 발생 */}
      <button onClick={() => setTestObject({ count: 1 })}>Object Type 렌더링 체크(Hooks (Function Component))</button>
    </div>
  );
};

// React.memo를 씌우지 않은 hooks는 부모 컴포넌트가 리렌더링 되면
// 같이 리렌더링이 발생한다.(PureComponent와 달리 따로 처리해줘야한다.)
// export default Hooks;

// 부모컴포넌트의 렌더링 여부와 상관없이,
// React.memo를 통해 감싸주면 해당 컴포넌트의 props와 state변경시에만 리렌더링이 이루어진다.
export default React.memo(Hooks);
```

- memo를 씌우지 않는다면, Class형 컴포넌트에서 Should Component를 따로 정의해주지 않은 것처럼 부모컴포넌트가 리렌더링 될떄마다 리렌더링이 발생한다.
- memo로 Function Component를 감싸주면, 비로소, PureComponent처럼 자기 컴포넌트의 state나 props가 바뀌지 않는 이상 리렌더링이 발생하지 않는다.

> 부모 컴포넌트 리렌더링에 대해 리렌더링 방지 처리는 모두 해놓았습니다.
>
> > 위에서 말한 리렌더링 제어 구문들을 빼서 테스트해보자 부모컴포넌트 리렌더링 여부와 상관없이 리렌더링 발생하지 않았다는것을 보여주고 마무리 하겠습니다.
> > ![](2020-10-28-15-29-32.png)

> 리렌더링 성능 개선이 무조건적으로 좋다는 의견을 드리고 싶은것은 아닙니다. 하지만, 개발을 하시면서 불필요한 리렌더링은 막는 것이 산출물의 성능에도 큰 도움이 될 것으로 생각합니다. 리렌더링 방지를 너무 잘해놓았다가, 리렌더링에 대한 개념이 충분하지 않은 협업자가 있다면, 버그로 생각될 수도 있기에... 때에 맞춰서 용도에 맞게 사용하시면 좋을 것 같습니다. pureComponent가 제공해주는 기능은 적은만큼 Hooks나 Class형 컴포넌트보다 빠르다는 이야기도 보기는 했으나... 위에서 설명드린 컴포넌트 종류들을 용도에 맞게 잘 사용하시길 권장드립니다.

> 잘못된 정보가 있다면 피드백은 언제든 환영입니다 감사합니다.
