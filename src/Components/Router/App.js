import React, { useContext } from "react";
import { Wrapper, Router, Route } from "./Koute";

/**
 * this is just a demo app
 */
function App() {
  return (
    <Wrapper base="home">
      <Changer />
      <Route
        path="Home"
        component={() => {
          return <h1>Am home</h1>;
        }}
      />
      <Route
        path="google"
        component={() => {
          return <h1>hey Google</h1>;
        }}
      />
      <Route
        path="Yahhoo"
        component={() => {
          return <h1>fuck yahoo</h1>;
        }}
      />
      <Route
        path="faceMAsh"
        component={() => {
          return <h1>faceMAsh is dead</h1>;
        }}
      />
    </Wrapper>
  );
}
function Changer() {
  const { route, changeRoute } = useContext(Router);
  return (
    <div>
      <button onClick={() => changeRoute("google")}>What's google</button>
      <button onClick={() => changeRoute("Yahhoo")}>like Yahoo?</button>
      <button onClick={() => changeRoute("faceMAsh")}>Where's faceMAsh</button>
      <button onClick={() => changeRoute("", true)}>Get back</button>
      <div>
        <h5 style={{ color: "red" }}>route is: {route}</h5>
      </div>
    </div>
  );
}
export default App;
