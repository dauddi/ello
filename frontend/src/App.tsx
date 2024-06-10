import React from "react";
import { Container, Typography, Box } from "@mui/material";
import BookSearch from "./components/BookSearch";
import ReadingList from "./components/ReadingList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Container>
      <Box
        mb={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0 1rem 0",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "2rem" }}>
          Ello Book Assignment
        </Typography>
        <BookSearch />
      </Box>
      <Box mb={4}>
        <ReadingList />
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable
        hideProgressBar
      />
    </Container>
  );
};

export default App;
