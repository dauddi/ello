import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Modal,
  Button,
  Typography,
  Checkbox,
  IconButton,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_BOOKS } from "@graphql/queries";
import { Book } from "@graphql/schema";
import { useAppDispatch, useAppSelector } from "@store/hooks/rtk";
import {
  addBookToReadingList,
  selectReadingLists,
} from "@store/readingListsSlice";
import { generateCUID } from "@utils/cuid";
import { BookItem } from "@components";

const BookSearch: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const dispatch = useAppDispatch();
  const readingLists = useAppSelector(selectReadingLists);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && data.books) {
      const booksWithIds = data.books.map((book: Omit<Book, "id">) => ({
        ...book,
        id: generateCUID(),
      }));
      setBooks(booksWithIds);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (books && books.length > 0) {
      const filtered = books.filter((book: Book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredBooks([]);
  };

  const handleAddBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLists([]);
    setSelectedBook(null);
  };

  const handleListSelect = (listId: string) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleAddToLists = () => {
    if (selectedLists.length === 0) {
      toast.error("Please select at least one reading list.");
      return;
    }
    if (selectedBook) {
      selectedLists.forEach((listId) => {
        dispatch(addBookToReadingList({ listId, book: selectedBook }));
      });
      toast.success("Book added to selected reading lists!");
    }
    handleModalClose();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
        width: {
          xs: "100%",
          md: 480,
          lg: 560,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 2,
        }}
      >
        <TextField
          inputRef={searchRef}
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              paddingRight: "40px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery && (
                  <IconButton onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                )}
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {searchQuery && (
        <Paper
          sx={{
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            magin: "2px 4px",
            maxHeight: 420,
            overflow: "auto",
            zIndex: 2,
          }}
        >
          <List
            sx={{
              padding: "2px 4px",
            }}
          >
            {filteredBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                actionLabel="Add to List"
                onActionClick={() => handleAddBook(book)}
              />
            ))}
          </List>
        </Paper>
      )}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            padding: 2,
            margin: "3.6rem auto",
            width: { sm: "95vw", md: "450px" },
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Select Reading Lists</Typography>
          <List>
            {readingLists.map((list) => (
              <ListItem
                button
                key={list.id}
                onClick={() => handleListSelect(list.id)}
              >
                <ListItemText primary={list.name} />
                <Checkbox
                  checked={selectedLists.includes(list.id)}
                  onChange={() => handleListSelect(list.id)}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToLists}
          >
            Add to Lists
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BookSearch;
