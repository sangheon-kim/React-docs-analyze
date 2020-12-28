import React from "react";

const Before1 = () => {
  const [form, setForm] = React.useState({
    name: "",
    age: 0,
  });

  const { name, age } = form;

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="Before1">
      <label>이름</label>
      <input type="text" name="name" value={name} onChange={onChange} />
      <label>나이</label>
      <input type="number" name="age" value={age} onChange={onChange} />
    </div>
  );
};

export default Before1;
