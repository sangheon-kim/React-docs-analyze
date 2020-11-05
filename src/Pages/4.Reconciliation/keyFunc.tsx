/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

interface ITodo {
  id: number;
  createdAt: Date;
}

const ToDo: React.FC<ITodo> = (props: ITodo) => {
  return (
    <tr>
      <td>
        <label>{props.id}</label>
      </td>
      <td>
        <input />
      </td>
      <td>
        <label>{props.createdAt.toTimeString()}</label>
      </td>
    </tr>
  );
};

const TableBody: React.FC = (props: any) => {
  const ListItems = React.Children.map(props.children, (child: React.ReactElement, index: number) => {
    return child;
  });

  return <tbody>{ListItems}</tbody>;
};

const ToDoList: React.FC = () => {
  const [todoCounter, setTodoCounter]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(1);
  const [list, setList] = React.useState([
    {
      id: todoCounter,
      createdAt: new Date(),
    },
  ]);

  const sortByEarliest = () => setList([...list.sort((a: ITodo, b: ITodo) => (a.createdAt as any) - (b.createdAt as any))]);
  const sortByLatest = () => setList([...list.sort((a: ITodo, b: ITodo) => (b.createdAt as any) - (a.createdAt as any))]);
  const addToEnd = () => {
    setList([...list, { id: todoCounter + 1, createdAt: new Date() }]);
    setTodoCounter(todoCounter + 1);
  };
  const addToStart = () => {
    setList([{ id: todoCounter + 1, createdAt: new Date() }, ...list]);
    setTodoCounter(todoCounter + 1);
  };

  return (
    <div>
      <h2>Sangheon Kim's Key Guide</h2>
      <code>key에 고유값만 넣어주면? (index x)</code>
      <br />
      <button onClick={addToStart}>배열에 맨앞에 추가</button>
      <button onClick={addToEnd}>배열에 맨끝에 추가</button>
      <button onClick={sortByEarliest}>날짜 오름차순 정렬</button>
      <button onClick={sortByLatest}>날짜 내림차순 정렬</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th />
            <th>created at</th>
          </tr>
        </thead>
        <TableBody>
          {list.map((todo: ITodo, index: number) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default ToDoList;
