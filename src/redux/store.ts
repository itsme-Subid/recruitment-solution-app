import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useSelector } from "react-redux";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
