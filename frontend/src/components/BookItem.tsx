import React from "react";
import { ListItem, ListItemText, Button, Avatar } from "@mui/material";
import { Book } from "@graphql/schema";

interface BookItemProps {
  book: Book;
  actionLabel: string;
  actionVariant?: string;
  onActionClick: () => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  actionLabel,
  onActionClick,
  actionVariant = "secondary",
}) => {
  return (
    <ListItem sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        variant="square"
        src={book.coverPhotoURL}
        alt={book.title}
        sx={{ marginRight: 2 }}
      />
      <ListItemText primary={book.title} secondary={book.author} />
      <Button
        variant={"contained"}
        color={actionVariant}
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    </ListItem>
  );
};

export default BookItem;
