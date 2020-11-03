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

class Sample2 extends Component {
  childComponent: any;
  constructor(props: any) {
    super(props);
    this.childComponent = React.createRef();
  }

  callChildMethod = () => {
    this.childComponent.blahblah();
    console.log(this.childComponent.state.age);
  };

  render() {
    return (
      <div>
        <h1>여기는 부모 컴포넌트.</h1>
        <Child onParentRef={(ref: any) => (this.childComponent = ref)} />
        <button onClick={this.callChildMethod}>블라블라</button>
      </div>
    );
  }
}

export default Sample2;
