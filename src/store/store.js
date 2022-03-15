import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

const middlewareEnhancer = applyMiddleware(logger);

function configureStore() {
  const composed = compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return createStore(taskReducer, composed);
}

export default configureStore;
