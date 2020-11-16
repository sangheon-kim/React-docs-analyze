import React from "react";
import About from "./CodeSplitting/About/About";
import Home from "./CodeSplitting/Home/Home";
import Inquire from "./CodeSplitting/Inquire/Inquire";

const NoSplitting: React.FC = () => {
  const [router, setRouter] = React.useState("Home");

  const makeContainer = React.useCallback(() => {
    switch (router) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "Inquire":
        return <Inquire />;
      default:
        return;
    }
  }, [router]);

  return (
    <div className="NoSplitting">
      <p>코드 분할 전</p>
      <button onClick={() => setRouter("Home")}>홈</button>
      <button onClick={() => setRouter("About")}>소개</button>
      <button onClick={() => setRouter("Inquire")}>문의</button>
      {makeContainer()}
    </div>
  );
};

export default NoSplitting;
