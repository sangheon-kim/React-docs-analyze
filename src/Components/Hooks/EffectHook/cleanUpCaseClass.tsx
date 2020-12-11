import React, { Component } from "react";

class CleanUpCaseClass extends Component {
  state: {
    width: number;
    height: number;
  };
  constructor(props: any) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this._eventCallback = this._eventCallback.bind(this);
  }

  _eventCallback(e: any) {
    console.log("resize 이벤트 감지중");
    this.setState({
      width: e.target.innerWidth,
      height: e.target.innerHeight,
    });
  }

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener("resize", this._eventCallback);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._eventCallback);
  }

  render() {
    const { width, height } = this.state;
    return (
      <div>
        <h2>너비 : {width}</h2>
        <h2>높이 : {height}</h2>
      </div>
    );
  }
}

export default CleanUpCaseClass;
