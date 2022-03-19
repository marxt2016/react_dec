import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task";

function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
