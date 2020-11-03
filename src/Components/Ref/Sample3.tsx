import React from "react";
import { Component } from "react";

type Props = {
  onParentRef: any;
};
class Child extends Component<Props> {
  onParentRef: any;
  constructor(props: any) {
    super(props);
    if (props.onParentRef) {
      // props.onParentRef = this;
      // console.log(props.onParentRef);
      props.onParentRef(this);
    }

    this.state = {
      age: 22,
    };
  }

  blahblah = () => {
    console.log("BlahBlah~");
  };

  render() {
    return (
      <div>
        <h2>여기는 Child 컴포넌트. </h2>
      </div>
    );
  }
}

class Sample3 extends Component {
  childComponent: any;
  constructor(props: any) {
    super(props);
    this.childComponent = React.createRef();
    this.setChangeChild = this.setChangeChild.bind(this);
  }

  callChildMethod = () => {
    this.childComponent.blahblah();
    console.log(this.childComponent.state.age);
  };

  setChangeChild(ref: any) {
    this.childComponent = ref;
  }

  render() {
    return (
      <div>
        <h1>여기는 부모 컴포넌트.</h1>
        <Child onParentRef={this.setChangeChild} />
        <button onClick={this.callChildMethod}>블라블라</button>
      </div>
    );
  }
}

export default Sample3;
