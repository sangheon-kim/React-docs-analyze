import * as React from "react";

interface OwnProps {

}

interface OwnState {
  test: number;
  testObject: {count: number};
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
      testObject : {
        count: 1,
      }
    }
  }

  render() {
    console.log('React.PureComponent render');
    return (
      <div>
        퓨어 컴포넌트 {this.state.test}<br />
        {/* primitive 타입의 경우 값의 변경이 일어날때만 변경 */}
        <button onClick={() => this.setState({test: 100})}>
          primitive Type 렌더링 체크(Pure Component)
        </button>
        {/* object타입의 경우 reference만 확인하기때문에 {} 과 {}도 다르기에 리렌더링 발생 */}
        {/* <button onClick={() => this.setState({testObject: this.state.testObject})}> */}
        <button onClick={() => this.setState({testObject: {count: 1}})}>
          Object Type 렌더링 체크(Pure Component)
        </button>
      </div>
    )
  }
}