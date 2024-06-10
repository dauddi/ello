import React, { useState, Fragment } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
} from "@mui/material";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@store/hooks/rtk";
import {
  selectReadingLists,
  removeReadingList,
} from "@store/readingListsSlice";
import { ReadingListModal, CreateReadingListModal } from "@components";
import { Book } from "@graphql/schema";

const ReadingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const readingLists = useAppSelector(selectReadingLists);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteList = (listId: string) => {
    dispatch(removeReadingList(listId));
    toast.success("Reading list deleted!");
  };

  return (
    <Fragment>
      <Box sx={{ margin: "1rem 0" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: ".5rem 0",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Reading Lists
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: "#5acccc",
              ":hover": {
                backgroundColor: "#28b8b8",
              },
            }}
          >
            Create New List
          </Button>
        </Box>
        <Grid container spacing={3}>
          {readingLists.map((list) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={list.id}>
              <Card
                onClick={() => setSelectedListId(list.id)}
                sx={{ height: "100%" }}
              >
                <CardContent sx={{ padding: 2 }}>
                  <Grid container spacing={1}>
                    {list.books.slice(0, 4).map((book: Book, index: number) => (
                      <Grid item xs={6} key={index}>
                        <CardMedia
                          component="img"
                          image={book.coverPhotoURL}
                          alt={book.title}
                          sx={{
                            width: "100%",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                    ))}
                    {[...Array(Math.max(0, 4 - list.books.length))].map(
                      (_, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "100px",
                              backgroundColor: "lightgray",
                            }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ marginTop: 2 }}>
                        {list.name}
                      </Typography>
                      <Typography variant="body2">By OneEyedShinobi</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        marginTop: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedListId && (
          <ReadingListModal
            open={Boolean(selectedListId)}
            onClose={() => setSelectedListId(null)}
            listId={selectedListId}
          />
        )}
      </Box>
      <CreateReadingListModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Fragment>
  );
};

export default ReadingList;
