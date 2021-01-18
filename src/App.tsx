import React from "react";
import "./App.css";
// import Parent from "./Components/Ref/Parent";
import Parent from "./Components/Ref/Sample2";
import Sample2 from "./Components/Ref/Sample2";
import Single from "./Components/Ref/Container";
import Fragments from "./Pages/3.Fragments/3.Fragments";
import ForwardRefSample from "./Components/Ref/ForwardRefSample/ForwardRefSample";
import Check from "./Components/Reconciliation/Reconciliation";
import ToDoList from "./Pages/4.Reconciliation/keyFunc";
import ClassComponent from "./Components/Ref/DOMRef/Class";
import FunctionRef from "./Components/Ref/DOMRef/FunctionRef";
import AutoFocusTextInput from "./Components/Ref/ClassRef/ClassRefClass";
import ClassRefFunction from "./Components/Ref/ClassRef/ClassRefFunction";
import Parent2 from "./Components/useImplerativeHandle/index";

import NoSplitting from "./Container/NoSplitting";
import Splitting from "./Container/CodeSplitting/MainContainer";
import HooksContainer from "./Container/Hooks";
// import CleanUpCaseHook from "./Components/Hooks/EffectHook/clienUpCaseHook";
import CleanUpCaseHook from "./Components/Hooks/EffectHook/clienUpCaseHook";
import CustomHooks1 from "./Container/CustomHooks/CustomHooks1";
import Before1 from "./Container/CustomHooks/Before1";
import Before2 from "./Container/CustomHooks/Before2";
import CustomHooks2 from "./Container/CustomHooks/CustomHooks2";
import CustomHooks3 from "./Container/CustomHooks/CustomHooks3";
import TodoContainer from "./Container/SimpleTodo/TodoContainer";
import Counter from "./Components/Counter/Counter";
import ClassCounter from "./Components/Counter/ClassCounter";
import DummyForm from "./Components/Form/form";
function Sangheon() {
  const [isHidden, setHidden] = React.useState(false);

  // React.useEffect(() => {
  //   debugger;
  // }, [isHidden]);
  return (
    <div style={{ padding: 16 }}>
      {/* <NoSplitting /> */}
      {/* <Splitting /> */}
      {/* <HooksContainer /> */}
      {/* <button onClick={() => setHidden(!isHidden)}>화면 리사이즈 컴포넌트 unmount</button> */}
      {/* {!isHidden && <CleanUpCaseHook />} */}
      {/* <CustomHooks1 />
      <CustomHooks2 />
      <CustomHooks3 /> */}
      {/* <Before1 /> */}
      {/* <Before2 /> */}
      {/* <TodoContainer initialState={{ page: "list" }} /> */}
      {/* <ClassCounter /> */}
      {/* <Counter /> */}
      <DummyForm />
    </div>
  );
}

export default Sangheon;
