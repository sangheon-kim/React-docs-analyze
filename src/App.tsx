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
function App() {
  return (
    <div className="App">
      <Parent2 />
      {/* <ToDoList /> */}
      {/* <Check /> */}
      {/* <ForwardRefSample /> */}
      {/* <Single /> */}
      {/* <Fragments /> */}
      {/* <Parent /> */}
      {/* <Parent /> */}
      {/* <ClassComponent /> */}
      {/* <FunctionRef /> */}
      {/* <Sample2 /> */}
      {/* <AutoFocusTextInput /> */}
      {/* <ClassRefFunction /> */}
    </div>
  );
}

export default App;
