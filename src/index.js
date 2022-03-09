import React, { useState } from "react";
import ReactDOM from "react-dom";

function createStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function dispatch(action) {
    console.log(action);
    if (action.type === "task/completed") {
      const newArray = [...state];
      const elementIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elementIndex].completed = true;
      state = newArray;
      console.log(state);
    }
  }

  return { getState, dispatch };
}

const store = createStore([{ id: 1, description: "Task1", completed: false }]);
const App = (params) => {
  console.log(store.getState());

  return (
    <>
      <button onClick={() => store.dispatch({ type: "task/completed", payload: { id: 1 } })}>Complete task</button>
      <h1>app</h1>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
