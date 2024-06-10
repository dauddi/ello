import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Book } from "@graphql/schema";
import { ReadingList } from "@types";
import { generateCUID } from "@utils/cuid";

interface ReadingListsState {
  readingLists: ReadingList[];
}

const initialState = {
  readingLists: [
    {
      id: generateCUID(),
      name: "Default",
      books: [],
    },
  ],
} satisfies ReadingListsState as ReadingListsState;

export const readingListsSlice = createSlice({
  name: "readingLists",
  initialState,
  reducers: {
    setReadingLists: (state, action: PayloadAction<ReadingList[]>) => {
      state.readingLists = action.payload;
    },
    addReadingList: (state, action: PayloadAction<ReadingList>) => {
      state.readingLists.push(action.payload);
    },
    addBookToReadingList: (
      state,
      action: PayloadAction<{ listId: string; book: Book }>
    ) => {
      const { listId, book } = action.payload;
      const list = state.readingLists.find((list) => list.id === listId);
      if (list) {
        list.books.push(book);
      }
    },
    removeBookFromReadingList: (
      state,
      action: PayloadAction<{ listId: string; bookId: string }>
    ) => {
      const { listId, bookId } = action.payload;
      const list = state.readingLists.find((list) => list.id === listId);
      if (list) {
        list.books = list.books.filter((book) => book.id !== bookId);
      }
    },
    removeReadingList: (state, action: PayloadAction<string>) => {
      state.readingLists = state.readingLists.filter(
        (list) => list.id !== action.payload
      );
    },
    clearReadingList: (state, action: PayloadAction<string>) => {
      const list = state.readingLists.find(
        (list) => list.id === action.payload
      );
      if (list) {
        list.books = [];
      }
    },
  },
});

export const {
  setReadingLists,
  addReadingList,
  addBookToReadingList,
  removeBookFromReadingList,
  removeReadingList,
  clearReadingList,
} = readingListsSlice.actions;

export const selectReadingLists = (state: RootState) =>
  state.readingLists.readingLists;

export default readingListsSlice.reducer;
