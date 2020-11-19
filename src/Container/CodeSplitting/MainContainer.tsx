/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
const About = React.lazy(() => import("./About/About"));
const Home = React.lazy(() => import("./Home/Home"));
const Inquire = React.lazy(() => import("./Inquire/Inquire"));
const Splitting: React.FC = () => {
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
        return <Home />;
    }
  }, [router]);

  return (
    <div style={{ padding: 16 }}>
      <p>Error Boundaries를 이용하여 해당 컴포넌트 외부로 에러가 나가지 않게 경계!</p>
      <button onClick={() => setRouter("Home")}>홈</button>
      <button onClick={() => setRouter("About")}>소개</button>
      <button onClick={() => setRouter("Inquire")}>문의</button>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading... Sangheon ZZang</div>}>{makeContainer()}</React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Splitting;
