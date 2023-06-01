import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import exampleReduce from "./slices/exampleSlice";
import { pokemonApi } from "../services/pokemonApi";
import thunk from "redux-thunk";

const reducers = combineReducers({
  example: exampleReduce,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["example"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(pokemonApi.middleware)
      .concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
