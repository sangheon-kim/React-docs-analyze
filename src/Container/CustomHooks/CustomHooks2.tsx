import React from "react";
import { useForm } from "../../Hooks/useForm";

const CustomHooks2 = () => {
  const { onChange, form } = useForm({
    gender: "",
    telNumber: "",
  });

  const { gender, telNumber } = form;

  const selectOptions: Array<{ value: string; title: string }> = [
    {
      value: "",
      title: "선택",
    },
    {
      value: "M",
      title: "남",
    },
    {
      value: "W",
      title: "여",
    },
    {
      value: "etc",
      title: "기타",
    },
  ];

  return (
    <div className="CustomHooks2">
      <label>성별</label>
      <select onChange={onChange} value={gender} name="gender">
        {selectOptions.map((item) => {
          return (
            <option value={item.value} selected={gender === item.value} key={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
      <label>전화번호</label>
      <input
        type="text"
        name="telNumber"
        value={telNumber}
        onChange={onChange}
        placeholder="예) 010-1234-5678"
      />
    </div>
  );
};

export default CustomHooks2;
