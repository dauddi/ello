import React, { useState } from "react";
import { useAppDispatch } from "@store/hooks/rtk";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { addReadingList } from "@store/readingListsSlice";
import { toast } from "react-toastify";

interface CreateReadingListModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateReadingListModal: React.FC<CreateReadingListModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [listName, setListName] = useState("");

  const handleCreateList = () => {
    if (listName.trim() !== "") {
      dispatch(
        addReadingList({ id: `${Date.now()}`, name: listName, books: [] })
      );
      toast.success("Reading list created!", {
        hideProgressBar: true,
        draggable: true,
      });
      setListName("");
      onClose();
    } else {
      toast.error("List name cannot be empty", {
        hideProgressBar: true,
        draggable: true,
      });
    }
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
        <Typography variant="h6">Create New Reading List</Typography>
        <TextField
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          fullWidth
          sx={{ margin: "1.25rem 0" }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateList}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateReadingListModal;
