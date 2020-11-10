import * as React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const FancyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  // 두번째 인수 ref는 forwardRef를 사용할 때만 제공해준다. 일반 함수에서는 ref를 매개변수로 전달받을 수 없습니다.
  // props에서 ref를 사용할 수도 없습니다.
  <button type="button" ref={ref} className="FancyButton">
    {props.children} {/* ClickMe */}
  </button>
));

const ForwardRefSample: React.FC = () => {
  const ref = React.createRef<HTMLButtonElement>();

  React.useEffect(() => {
    console.log(ref); // 잘찍히는 것을 확인할 수 있다.
  }, [ref]);
  return <FancyButton ref={ref}>Click me!</FancyButton>;
};

export default ForwardRefSample;
