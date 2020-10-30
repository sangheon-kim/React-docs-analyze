import React, { RefObject } from 'react'
import Button from './Button/Button';

type Props = {}

function Parent(props: any) {
  const ref0 = React.useRef<HTMLButtonElement>();
  const ref1 = React.useRef<HTMLButtonElement>();
  const ref2 = React.useRef<HTMLButtonElement>();
  const ref3 = React.useRef<HTMLButtonElement>();
  const refArray = [ref0, ref1, ref2];
  
  const returnFunc = (index: number, child: any, ref: RefObject<HTMLButtonElement>) => {

    const array = [
      {
        onClick: function() {
          if (ref.current)
            ref.current.textContent = `${index + 2}초 뒤 원래 버튼`
          
          setTimeout(() => {
            if (ref.current)
              ref.current.textContent = child.props.id
          }, (index + 2) * 1000)
        },
        onMouseOver: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'red'
        },
        onMouseLeave: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'skyBlue'
        }
      },
      {
        onClick: function() {
          if (ref.current && ref3.current) {
            ref3.current.textContent = '변경됨'
          }
          
          setTimeout(() => {
            if (ref.current && ref3.current) {
              ref.current.textContent = child.props.id
              ref3.current.textContent = '4번째 버튼'
            }
              
          }, (index + 2) * 1000)
        },
        onMouseOver: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'purple'
        },
        onMouseLeave: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'skyBlue'
        }
      },
      {
        onClick: function() {
          if (ref.current)
            ref.current.textContent = `${index + 2}초 뒤 짬뽕 먹고 싶어짐`
          
          setTimeout(() => {
            if (ref.current)
              ref.current.textContent = child.props.id
          }, (index + 2) * 1000)
        },
        onMouseOver: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'yellow'
        },
        onMouseLeave: function() {
          if (ref.current)
            ref.current.style.backgroundColor = 'skyBlue'
        }
      }
    ];

    return array[index]
  }

  const updateWithprops = React.Children.map(props.children,
   (child, i) => {              
    const { props } = child;
    const { onClick, onMouseOver, onMouseLeave } = returnFunc(i, child, refArray[i] as RefObject<HTMLButtonElement>);
    
    return React.cloneElement(
      child, 
      {
        className: `${props.className ? props.className : ''}, ${props.id}`,
        onClick: onClick,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave,
        ref: refArray[i]
      }, 
      <span>{child.props.id}</span>
    );
  });

  const MyButton = (elemType = 'button'):React.ReactElement => 
  (React.createFactory(elemType))({
    onClick: (evt) => {
      evt.preventDefault();
    }
  }, '5th Button');
  
  const $button: React.ReactElement = React.createElement("button", {ref: ref3});

  const button3 = React.cloneElement($button, {
    onClick: () => console.log('4번째 버튼 클릭')
  }, '4th Button')
  
  const button2 = React.cloneElement(MyButton(), {
    onClick: () => window.alert("경고")
  });

  
  return (
    <React.Fragment>
      {updateWithprops}
      {button3}
      {button2}
    </React.Fragment>
  )
}

class Sample extends React.Component {
  private myRef: RefObject<HTMLButtonElement>
  constructor(props:Props) {
    super(props);
    this.state = {};

    this.myRef = React.createRef();
    this.click = this.click.bind(this)
  }
  
  click() {
    if (!!this.myRef.current) {
      this.myRef.current.classList.toggle("active")
    }
  }

  render() {
    
    return(
      <div className="Sample">
        <Parent>
          <Button id="1st Button"></Button>
          <Button id="2nd Button(클릭시 4번째 버튼 변경)"></Button>
          <Button id="3rd Button"></Button>
        </Parent>
        {/* <Button onClick={this.click} >버튼</Button> */}
      </div>
    )
  }
}

export default Sample;