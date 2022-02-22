import React from "react";
import ReactDOM from "react-dom";
import { compose, pipe } from "lodash/fp";

const App = (params) => {
  const x = 2;

  const double = (number) => number * 2;
  const square = (number) => number * number;
  const half = (number) => number / 2;
  // const divide = (n1, n2) => n1 / n2;
  //curring
  const divideCurr = (n2) => {
    return function (n1) {
      return n1 / n2;
    };
  };
  // const mathCalc = compose(half, square, double); // all functions for compose are executed in reverse order
  const mathCalcPipe = pipe(double, square, half, divideCurr(3)); // pipe executes in direct order

  return <h1>{mathCalcPipe(x)}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
