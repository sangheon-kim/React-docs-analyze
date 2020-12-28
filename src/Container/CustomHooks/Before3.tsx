import React from "react";

const Before3 = () => {
  const [hobby, setHobby] = React.useState("");

  const onChange = (e: any) => {
    const { value } = e.target;
    setHobby(value);
  };

  React.useEffect(() => {
    console.log(hobby);
  }, [hobby]);

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

export default Before3;
