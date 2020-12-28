import React from "react";
import { useForm } from "../../Hooks/useForm";

const CustomHooks1 = () => {
  const { onChange, form } = useForm({
    name: "",
    age: 0,
  });

  const { name, age } = form;

  return (
    <div className="CustomHooks1">
      <label>이름</label>
      <input type="text" name="name" value={name} onChange={onChange} />
      <label>나이</label>
      <input type="number" name="age" value={age} onChange={onChange} />
    </div>
  );
};

export default CustomHooks1;
