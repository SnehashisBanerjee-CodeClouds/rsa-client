/** Redux Store */
import { configureStore } from "@reduxjs/toolkit";
import { Reducers } from "@/types/store";
import {
  loadState,
  localStorageMiddleware,
} from "@/lib/middlewares/localStorageMiddleware";
import roomReducer from "@/lib/slices/roomSlice";
import contactsReducer from "@/lib/slices/contactSlice";
import stepReducer from "@/lib/slices/stepSlice";
const preloadedState: Reducers = loadState();

export const store = () => {
  return configureStore({
    reducer: {
      room: roomReducer,
      contacts: contactsReducer,
      step: stepReducer,
    },
    preloadedState, // Preload the State from Local Storage
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
