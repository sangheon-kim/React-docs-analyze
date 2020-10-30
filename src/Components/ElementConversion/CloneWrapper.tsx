import * as React from 'react';
import { buttonClick, linkClick } from "../../assets/util";

// 클론 Wrapper 이안에 들어오는 Children 요소들에 대해서 props를 재정의하거나, children을 재정의가 가능하다.
const CloneWrapper:React.FC = (props: any) => {
  let refArray: any = [];
  
  const cloneButtons = React.Children.map(props.children, (child:React.ReactElement, index: number) => {
    refArray.push(React.createRef());
    console.log()
    
    return React.isValidElement(child) ?  React.cloneElement(child as React.ReactElement, {
      onClick:  child.type === 'a' ? (e: any) => linkClick(e, refArray, index) : (e: any) => buttonClick(e, refArray, index),
      ref: refArray[index]
    }) : null
  })
  
  return <React.Fragment>{cloneButtons}</React.Fragment>
}

export default CloneWrapper;