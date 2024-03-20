import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

const devMode = process.env.NODE_ENV === "development";

import createSagaMiddleware from "@redux-saga/core";

// slices
import { loginSlice } from "../lib/features/auth/login/loginSlice";

// generator functions
import { loginSagas } from "../lib/features/auth/login/loginSaga";
import { createWrapper } from "next-redux-wrapper";

function* rootSaga() {
  yield all([
    ...loginSagas,
    // add more sagas
  ]);
}
// creating saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (devMode) {
  // middleware.push(logger);
}

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [loginSlice.name]: loginSlice.reducer,
    },
    devTools: devMode,
    middleware: () => {
      return middleware;
    },
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.sagaTask.toPromise();
  return store;
};

// export const wrapper = createWrapper(makeStore);
