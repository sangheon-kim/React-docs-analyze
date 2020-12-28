import React from "react";
import { useForm } from "../../Hooks/useForm";

const CustomHooks3 = () => {
  const { hobby, onChange } = useForm("", "hobby");

  return (
    <div>
      <label>취미</label>
      <input
        type="text"
        name="hobby"
        value={hobby}
        onChange={onChange}
        placeholder="취미를 입력하세요"
      />
    </div>
  );
};

export default CustomHooks3;
