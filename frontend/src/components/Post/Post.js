import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Post.css";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Modal,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../iconify/Iconify.js";
import Comments from "../../views/CommentPage/Comments";
import profileImage from "../../images/profile.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Post = ({ id, userName, caption, imagePath, likeCount, userId }) => {
  // console.log( id, userName, caption, imagePath, likeCount,userId );
  const [captionState, setCaptionState] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("users")).uid;

  const handleCaptionChange = (event) => {
    setCaptionState(event.target.value);
  };

  const handleOpenEdit = (event) => {
    setOpenModalEdit(true);
    setCaptionState(event.caption);
  };

  const handleCloseEdit = () => {
    setOpenModalEdit(false);
  };

  const setOpen = (value) => {
    setMenuOpen(value);
  };

  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleOpenComment = () => {
    ReactDOM.render(
      <Comments postId={id} postImage={imagePath} />,
      document.getElementById("root")
    );
  };

  // const getPost = () => {
  //   fetch('http://localhost:8080/post' + id)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCaptionState(data.caption);
  //       console.log(data, 'zzz');
  //     });
  // };

  const handleSubmitEditPost = (id) => {
    let payload = {
      caption: captionState,
    };
    console.log(id, payload, "id and payload");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/posts/update/${id}`, requestOptions)
      .then(
        (response) => response.json(),
        // console.log('response', response),
        window.location.reload()
      )
      // .then((response) => response.json())
      .then((data) => {
        //getPost();
        setOpenModalEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletePost = (id) => {
    console.log(id);
    fetch(`http://localhost:8080/api/posts/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // console.info('Post deleted successfully');
        alert("Post deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting Post:", error);
      });
  };

  return (
    <div className="post__container">
      {/* Header */}
      <div className="post__header">
        <Avatar className="post__image" src={profileImage} />
        <div className="post__username">{userName}</div>
        {userId === currentUser ? (
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            sx={{ color: "text.secondary" }}
          >
            <Iconify icon="feather-more-vertical" />
          </IconButton>
        ) : null}
      </div>
      {/* Caption */}
      <div className="post__caption" style={{ padding: "10px" }}>
        {caption}
      </div>

      {/* Image */}
      <div className="post__imageContainer">
        <img className="post__image" src={imagePath} alt="post" />
      </div>

      {/* Action Icons */}
      <div className="post__actions">
        <div className="post__action">
          <img className="post__icon" src={love} alt="love" />
          {/* <Typography variant="subtitle1">{likes.length}</Typography> */}
        </div>
        <div className="post__action">
          <img
            className="post__icon"
            src={comment}
            alt="comment"
            onClick={handleOpenComment}
          />
          {/* <Typography variant="subtitle1">50</Typography> */}
        </div>
        <div className="post__action">
          <img className="post__icon" src={share} alt="share" />
          <Typography variant="subtitle1"></Typography>
        </div>
      </div>

      {/* Edit Post Modal */}
      <Modal
        open={openModalEdit}
        onClose={handleCloseEdit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            maxWidth: "500px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Caption
          </Typography>
          <TextField
            id="caption"
            label="Caption"
            fullWidth
            value={captionState}
            onChange={handleCaptionChange}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => handleSubmitEditPost(id)}
            style={{ backgroundColor: "#2c3e50", color: "#fff" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      {/* Delete and Edit Post Popover */}
      <Popover
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="post__popover">
          <MenuItem onClick={() => handleOpenEdit({ caption })}>Edit</MenuItem>
          <MenuItem onClick={() => handleDeletePost(id)}>Delete</MenuItem>
        </div>
      </Popover>
    </div>
  );
};
export default Post;
