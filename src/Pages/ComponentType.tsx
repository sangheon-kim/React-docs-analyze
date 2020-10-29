import React from 'react';
import Hooks from '../Components/ComponentType/Hooks';
import PureComponentClass from '../Components/ComponentType/PureComponent';
import ReactComponentClass from '../Components/ComponentType/ReactComponent';

const ComponentType = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      부모 컴포넌트 리렌더링 발생으로 자식컴포넌트 렌더링 확인<br />
      {count}
      <button onClick={() => {
        console.log('App컴포넌트 1증가')
        setCount(count + 1);
      }}>+1(App.tsx)</button>
      <button onClick={() => {
        console.log('App컴포넌트 1감소')
        setCount(count - 1)
      }}>-1(App.tsx)</button>
      <PureComponentClass />
      <Hooks />
      <ReactComponentClass />
    </div>
  );
};

export default ComponentType;