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
function Sangheon() {
  return (
    <React.Fragment>
      <NoSplitting />
    </React.Fragment>
  );
}

export default Sangheon;
