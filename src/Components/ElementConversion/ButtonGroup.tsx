import * as React from 'react';
import { btnArray, createButton, createLink, IBtnAttr, IMenuAttr, linkArray } from "../../assets/dummy";
import CloneWrapper from "./CloneWrapper";


const ButtonGroup = () => {
  
  return (
    <div className="ButtonGroup">
      <CloneWrapper>
        {btnArray.map((item:IBtnAttr, index) => createButton(item, index))}
        {linkArray.map((item: IMenuAttr, index) => createLink(item, index))}
      </CloneWrapper>
    </div>
  )
}

export default ButtonGroup