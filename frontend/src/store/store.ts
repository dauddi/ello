import { configureStore } from "@reduxjs/toolkit";
import readingListsReducer from "./readingListsSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    // @ts-ignore
    readingLists: readingListsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    readingLists: store.getState().readingLists,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
