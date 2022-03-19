import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { titleChanged, taskDeleted, completeTask, getTasks } from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector } from "react-redux";

const store = configureStore();

const App = (params) => {
  // const [state, setState] = useState(store.getState());
  const state = useSelector((state) => state);

  useEffect(() => {
    store.dispatch(getTasks());
    // store.subscribe(() => {
    //   setState(store.getState());
    // });
  }, []);

  const changeTitlle = (taskId) => {
    store.dispatch(() => {
      store.dispatch(titleChanged(taskId));
    });
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <>
      <h1>app</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>Complete task</button>
            <button onClick={() => changeTitlle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
