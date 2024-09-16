import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import authSlice from "./auth/authSlice";
import { Middleware } from "redux"; // To type middlewares
import  tuitionPostSlice  from "./tuition/tuitionsSlice";

// Persist configuration
const persistConfig = {
  key: "authentication",
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, authSlice);

// Combine Reducers
const combinedReducer = {
  user: persistedReducer,
  tuitions:tuitionPostSlice
};

// Middlewares array with typing
const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// Configure store with proper middleware typing
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});

// Persistor
export const persistor = persistStore(store);

// Type for the RootState (use this to type the state in your app)
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch (use this when dispatching actions)
export type AppDispatch = typeof store.dispatch;
