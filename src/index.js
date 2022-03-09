import React, { useState } from "react";
import ReactDOM from "react-dom";

function createStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  return { getState };
}

const store = createStore([{ id: 1, description: "Task1", completed: false }]);
const App = (params) => {
  console.log(store.getState());
  return <h1>app</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
