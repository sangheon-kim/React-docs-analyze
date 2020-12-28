import React from "react";

const Before2 = () => {
  const [form, setForm] = React.useState({
    gender: "",
    telNumber: "",
  });

  const telValidation = (telNumber: string) => {
    const reg = /([0-1]{3})-([0-9]{3,4})-([0-9]{4})/gm;
    const faultReg = /([0-1]{3})([0-9]{4})([0-9]{4})/gm;

    if (reg.test(telNumber)) {
      return telNumber;
    } else {
      const result = telNumber.replace(faultReg, `$1-$2-$3`);

      return result;
    }
  };

  const { gender, telNumber } = form;

  const onChange = (e: any) => {
    let { name, value } = e.target;

    value = name === "telNumber" ? telValidation(value) : value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log(form);
  }, [form]);

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
    <div className="Before2">
      <label>성별</label>
      <select onChange={onChange} value={gender} name="gender">
        {selectOptions.map((item) => {
          return (
            <option value={item.value} selected={gender === item.value}>
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

export default Before2;
