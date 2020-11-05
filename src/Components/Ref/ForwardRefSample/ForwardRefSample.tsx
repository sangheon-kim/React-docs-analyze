import * as React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const FancyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button type="button" ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ForwardRefSample: React.FC = () => {
  const ref = React.createRef<HTMLButtonElement>();

  React.useEffect(() => {
    console.log(ref);
  }, []);
  return <FancyButton ref={ref}>Click me!</FancyButton>;
};

export default ForwardRefSample;
