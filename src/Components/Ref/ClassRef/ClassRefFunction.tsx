import React from "react";

const ClassRefFunction: React.FC = () => {
  const _customTextInput: React.RefObject<CustomTextInput> = React.createRef();

  React.useEffect(() => {
    if (_customTextInput.current) {
      _customTextInput.current?.setState({ age: 27 });
      _customTextInput.current?.focusTextInput();
    }
  }, []);

  return <CustomTextInput ref={_customTextInput} />;
};

export default ClassRefFunction;

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
      console.log("부모컴포넌트가 함수 컴포넌트 자식 컴포넌트 상태 변화", {
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
