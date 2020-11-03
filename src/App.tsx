import React from "react";
import "./App.css";
import Parent from "./Components/Ref/Parent";
import Sample2 from "./Components/Ref/Sample2";
import Sample3 from "./Components/Ref/Sample3";
import Single from "./Components/Ref/Container";
import Fragments from "./Pages/3.Fragments/3.Fragments";

function App() {
  return (
    <div className="App">
      <Single />
      {/* <Fragments /> */}
      {/* <Parent /> */}
      {/* <Sample3 /> */}
    </div>
  );
}

export default App;
