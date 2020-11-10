import React, { Component } from "react";

type Props = {
  onParentRef: (ref: React.RefObject<Child>) => React.RefObject<Child>;
};

interface ParentType {}

class Child extends Component<Partial<Props>> {
  state: { age: number };

  constructor(props: Partial<Props>) {
    super(props);
    if (props.onParentRef) {
      props.onParentRef(this as any);
    }

    this.state = {
      age: 26,
    };

    this.sangheonZZang = this.sangheonZZang.bind(this);
  }

  sangheonZZang(): void {
    console.log(`이름 김상헌 나이는 ${this.state.age}살 입니다.`);
  }

  render() {
    return (
      <div>
        <h2>여기는 Child 컴포넌트. </h2>
      </div>
    );
  }
}

class Parent extends Component {
  childComponent: any;
  constructor(props: ParentType) {
    super(props);
    this.childComponent = React.createRef();
    this.callChildMethod = this.callChildMethod.bind(this);
  }

  /**
   *
   * @description 자식 컴포넌트의 메서드와 스테이트에 접근해서 호출
   * @memberof Parent
   */
  callChildMethod(): void {
    this.childComponent.sangheonZZang();
    console.log(this.childComponent.state.age);
  }

  render() {
    return (
      <div>
        <h1>여기는 부모 컴포넌트.</h1>
        <Child onParentRef={(ref: React.RefObject<Child>) => (this.childComponent = ref)} />
        <button onClick={this.callChildMethod}>블라블라</button>
      </div>
    );
  }
}

export default Parent;
