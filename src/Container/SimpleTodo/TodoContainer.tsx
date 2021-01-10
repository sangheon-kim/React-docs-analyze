import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

type Props = {
  initialState: { [key: string]: any };
};

const TodoContainer: React.FC<Props> = ({ initialState }) => {
  const { page } = initialState;
  const [router, setRouter] = React.useState(page);

  return (
    <div>
      {router === "list" && <TodoList setRouter={setRouter} />}
      {router === "form" && <Form setRouter={setRouter} />}
    </div>
  );
};

export default TodoContainer;
