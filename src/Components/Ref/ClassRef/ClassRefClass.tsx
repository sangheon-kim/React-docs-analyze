import * as React from "react";

interface IAutoFocusTextInput {}
class AutoFocusTextInput extends React.Component<IAutoFocusTextInput> {
  _customTextInput: React.RefObject<CustomTextInput>;
  constructor(props: IAutoFocusTextInput) {
    super(props);
    this._customTextInput = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    if (!!this._customTextInput.current) {
      this._customTextInput.current.setState({ age: 27 });
      this._customTextInput.current.focusTextInput();
    }
  }

  render() {
    return <CustomTextInput ref={this._customTextInput} />;
  }
}

export default AutoFocusTextInput;

interface ICustomTextInput {
  age?: number;
  name?: string;
}
class CustomTextInput extends React.Component<ICustomTextInput> {
  textInput: React.RefObject<HTMLInputElement>;
  state: ICustomTextInput;
  constructor(props: ICustomTextInput) {
    super(props);

    this.state = { age: 26, name: "Sangheon" };

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current?.focus();
  }

  shouldComponentUpdate(nextProps: ICustomTextInput, nextState: ICustomTextInput) {
    const { props, state } = this;

    if (state.age !== nextState.age) {
      console.log("자식 컴포넌트 상태 변화", {
        before: state.age,
        after: nextState.age,
      });

      return true;
    }

    return false;
  }

  render() {
    return (
      <div style={{ paddingLeft: 16 }}>
        <h1>부모 컴포넌트에서 저의 나이를 한살 올렸습니다.(자식 컴포넌트 어디에도 setState를 사용한적 없습니다.)</h1>
        <h2>부모 컴포넌트에서 자식 컴포넌트의 focusTextInput함수를 호출했습니다.</h2>
        <h3>{this.state.age}</h3>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
