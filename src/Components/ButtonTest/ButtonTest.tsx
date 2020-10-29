import React from 'react';
import { createButton } from "../../assets/dummy";

const ButtonTest:React.FC = () => {
  return createButton({text: "default", key: 'default-button'}, undefined)
};

export default ButtonTest;