import * as React from "react";

type Props = {};
export default class ClassComponent extends React.Component<Props> {
  _inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);

    this.state = {};
    this._inputRef = React.createRef();
  }

  componentDidMount() {
    console.log(this._inputRef.current);
    // 옵셔널 체이닝 연산자
    this._inputRef.current?.focus();
  }

  render() {
    return (
      <div>
        <h1>클래스 컴포넌트의 DOM엘리먼트에 ref 넣기</h1>
        <p>컴포넌트가 마운트되면 input에 커서 포커싱하기</p>
        <input type="text" ref={this._inputRef} name="Sangheon" />
      </div>
    );
  }
}
