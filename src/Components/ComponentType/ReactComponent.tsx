import * as React from "react";


interface OwnProps {

}

interface OwnState {
  test: number;
  testObject: {count: number};
}

type Props = OwnProps & OwnState;

export default class ReactComponentClass extends React.Component {
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

  /**
   * 
   * props는 디테일하게 비교해야 리렌더링이 발생하지 않는다. props와 nextProps만 비교하게되면 
   * {}와 {}를 비교하기에 무조건 다르다고 나와서 리렌더링이 빌생한다.
   * 단지 얕은 복사에 대한 부분을 막을 수 있다. 
   * (props객체와 state객체에 내부 프로퍼티의 값을 비교해서 처리가 가능)
   * 따라서 리렌더링에 대한 디테일한 부분까지 생각한다면, class형 컴포넌트의 scu를 활용하자
   * 
   */
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
  

  render() {
    console.log('React.Component Render');
    return (
      <div>
        리액트 컴포넌트 {this.state.test}<br />
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