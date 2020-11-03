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
