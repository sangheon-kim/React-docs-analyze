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
    document.title = `You Clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    // console.log(this.state);
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
