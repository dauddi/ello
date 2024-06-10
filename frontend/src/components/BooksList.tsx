import React from "react";
import { useQuery } from "@apollo/client";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { GET_BOOKS } from "@graphql/queries";
import { Book } from "@graphql/schema";

interface BookListProps {
  searchQuery: string;
  addBookToReadingList: (book: Book) => void;
}

const BooksList: React.FC<BookListProps> = ({
  searchQuery,
  addBookToReadingList,
}) => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { searchQuery },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List>
      {data.books.map((book: Book) => (
        <ListItem
          key={book.id}
          secondaryAction={
            <Button
              variant="contained"
              onClick={() => addBookToReadingList(book)}
            >
              Add
            </Button>
          }
        >
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      ))}
    </List>
  );
};

export default BooksList;
