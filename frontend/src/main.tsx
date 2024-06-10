import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client/react";
import client from "@config/apollo-client";
import { Provider } from "react-redux";
import { store } from "@store/store.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#cffafa",
      main: "#5acccc",
      dark: "#53c2c2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fabd33",
      main: "#fabd33",
      dark: "#fad00",
      contrastText: "#000",
    },
    error: {
      light: "#ffe6dc",
      main: "#f76434",
      dark: "#f76434",
      contrastText: "#fff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
