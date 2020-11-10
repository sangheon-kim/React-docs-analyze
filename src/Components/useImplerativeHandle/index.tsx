import * as React from "react";

type InputProps = React.HTMLProps<HTMLInputElement>;

const Child = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // 두번째 인수 ref는 forwardRef를 사용할 때만 제공해준다. 일반 함수에서는 ref를 매개변수로 전달받을 수 없습니다.
  // props에서 ref를 사용할 수도 없습니다.

  const inputRef = React.createRef<HTMLInputElement & { sayHello: () => void }>();
  React.useImperativeHandle(
    ref,
    (): any => ({
      sayHello: () => {
        // inputRef.current?.sayHello();
        console.log("반갑습니다. 김상헌입니다.");
      },
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    [inputRef]
  );
  return (
    <React.Fragment>
      <input type="text" ref={inputRef} className="FancyButton" />
    </React.Fragment>
  );
});

const Parent: React.FC = () => {
  const inputRef = React.createRef<HTMLInputElement & { sayHello: () => void }>();
  React.useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Child ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        input에 focusing해보자.
      </button>
      <button
        onClick={() => {
          inputRef.current?.sayHello();
        }}
      >
        안녕하세요 해보자.
      </button>
    </React.Fragment>
  );
};

export default Parent;
