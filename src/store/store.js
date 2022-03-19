import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, createStore, compose } from "redux";
// import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
import taskReducer from "./task";

// const middlewareEnhancer = applyMiddleware(logger, thunk);

function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== "production",
  });
}

// taskReducer, compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore;
