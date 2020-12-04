import React from "react";
import EffectHook from "../../Components/Hooks/EffectHook";
import ClassEffect from "../../Components/Hooks/EffectHook/classEffect";
import StateHook from "../../Components/Hooks/StateHook";
import ClassState from "../../Components/Hooks/StateHook/classState";

const HooksContainer = () => {
  // return <StateHook />;
  // return <ClassState />;
  return (
    <div style={{ padding: 16 }}>
      {/* <EffectHook /> */}
      <ClassEffect />
    </div>
  );
};

export default HooksContainer;
