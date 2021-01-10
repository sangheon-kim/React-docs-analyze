import React from "react";

type Props = {
  setRouter: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList: React.FC<Props> = ({ setRouter }) => {
  return (
    <div>
      <h1>Todo List</h1>
    </div>
  );
};

export default React.memo(TodoList);
