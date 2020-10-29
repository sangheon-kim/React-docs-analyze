import React, { RefObject } from 'react';
import "./Button.scss"

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  id: string;
  color?: string;
  className?: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

const Button:React.FC<Props> = React.forwardRef((props: Props, ref) => {
  return (
    <button 
      className={`button ${props.className}`} 
      id={props.id} 
      style={{color: props.color}} 
      onClick={() => props.onClick && props.onClick()}
      onMouseOver={() => props.onMouseOver && props.onMouseOver()}
      onMouseLeave={() => props.onMouseLeave && props.onMouseLeave()}
      ref={ref as RefObject<HTMLButtonElement>}
    >
      {props.children}
    </button>
  );
});

export default Button;