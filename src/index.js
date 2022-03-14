import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actionTypes";
import { createStore } from "./store/createStore";
import { initiateStore } from "./store/store";
import { taskReducer } from "./store/taskReducer";

// const initialState = [
//   { id: 1, title: "Task1", completed: false },
//   { id: 2, title: "Task2", completed: false },
// ];

const store = initiateStore();
const App = (params) => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch({ type: actions.taskUpdated, payload: { id: taskId, completed: true } });
  };
  const changeTitlle = (taskId) => {
    store.dispatch({ type: actions.taskUpdated, payload: { id: taskId, title: `New title for ${taskId}` } });
  };

  return (
    <>
      <h1>app</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete task</button>
            <button onClick={() => changeTitlle(el.id)}>Change title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
