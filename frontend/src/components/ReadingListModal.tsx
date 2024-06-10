import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks/rtk";
import { Box, Button, Modal, List, Typography } from "@mui/material";
import { RootState } from "@store/store";
import {
  removeBookFromReadingList,
  clearReadingList,
} from "@store/readingListsSlice";
import { Book } from "@graphql/schema";
import { BookItem } from "@components";

interface ReadingListModalProps {
  open: boolean;
  onClose: () => void;
  listId: string;
}

const ReadingListModal: React.FC<ReadingListModalProps> = ({
  open,
  onClose,
  listId,
}) => {
  const dispatch = useAppDispatch();
  const readingList = useAppSelector((state: RootState) =>
    state.readingLists.readingLists.find((list) => list.id === listId)
  );

  if (!readingList) {
    return null;
  }

  const handleRemoveBook = (bookId: string) => {
    dispatch(removeBookFromReadingList({ listId, bookId }));
  };

  const handleClearList = () => {
    dispatch(clearReadingList(listId));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "3.6rem auto",
          width: { sm: "95vw", md: "450px" },
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6">{`${readingList.name} Reading List`}</Typography>

        <List>
          {readingList.books.map((book: Book) => (
            <BookItem
              key={book.id}
              book={book}
              actionLabel="Remove"
              actionVariant="error"
              onActionClick={() => handleRemoveBook(book.id)}
            />
          ))}
        </List>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearList}
          sx={{ marginBottom: 2, display: "none" }}
        >
          Clear List
        </Button>
      </Box>
    </Modal>
  );
};

export default ReadingListModal;
