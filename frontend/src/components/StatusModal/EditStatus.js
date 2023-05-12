import React, { useEffect, useState } from "react";
import { Button, Modal, Box, Typography, TextField } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import "./EditStatus.css";
import NavBar from "../NavBar/NavBar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const EditStatus = (item) => {
  // const { id, userName, path, status } = item;
  const items = item.item;
  // getting data from item
  const [id, setId] = useState(items.id);
  const [userName, setUserName] = useState(items.userName);
  const [path, setPath] = useState(items.path);
  const [privacy, setprivacy] = useState(items.privacy);
  const [caption, setCaption] = useState(items.caption); // to store the title
  const [open, setOpen] = useState(false);
  const [editedCaption, setEditedCaption] = useState(caption);
  const [checked, setChecked] = React.useState(privacy);

  useEffect(() => {
    console.log(items.path);
    setId(items.id);
    setUserName(items.userName);
    setPath(items.path);
    setprivacy(items.privacy);
    setCaption(items.caption);
  }, [item]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const handleSave = () => {
    console.log(id);
    let payload = {
      caption: editedCaption,
      privacy: checked,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/story/update/${id}`, requestOptions)
      .then(
        (response) => response.json()
        // window.location.reload()
      )
      .then((data) => {
        console.log(data);
        //set update data to the item
        setCaption(data.caption);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:8080/api/story/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.info("Story deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting story:", error);
      });
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="status-item">
          <div className="close-btn">
            <Button
              variant="text"
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                backgroundColor: "transparent",
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="status-image-container">
            <img src={path} alt={caption} />
          </div>
          <div className="status-info">
            <div className="status-user">{userName}</div>
            <div className="status-caption">{caption}</div>
            <div className="button-container">
              <Button
                variant="contained"
                onClick={handleOpen}
                style={{
                  backgroundColor: "#2196f3",
                  color: "#fff",
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDelete(id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  marginTop: "10px",
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5" component="h2" mb={30}>
              Edit Caption
            </Typography>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                  />
                }
                label={checked ? "Private" : "Public"}
              />
            </div>
            <TextField
              fullWidth
              label="Caption"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              variant="outlined"
              mb={2}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleClose}
                mr={2}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSave(id)}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default EditStatus;
