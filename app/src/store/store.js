import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
