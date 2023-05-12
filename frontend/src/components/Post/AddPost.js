import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
  Chip,
} from "@material-ui/core";
import uploadImage from "../../images/upload.png";
import { storage, auth } from "../../firebase";

import "./Post.css";

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

const AddPost = () => {
  const [postArray, setPostArray] = useState([]);
  const [progressBar, setProgressBar] = useState("");
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // getPost();
  }, []);

  // const getPost = () => {
  //   //API
  //   fetch('http://localhost:8080/post')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPostArray(data);
  //     });
  // };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    upload();
  };

  const upload = () => {
    let image = file;
    if (image == null || image === undefined) return;

    var uploadTask = storage.ref("images").child(image.name).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress);
      },
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          let payload = {
            userId: JSON.parse(localStorage.getItem("users")).uid,
            imagePath: downloadURL,
            caption: caption,
            timeStamp: new Date().getTime(),
            likeCount: 0,
          };

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          };

          fetch("http://localhost:8080/api/posts/save", requestOptions)
            .then((response) => response.json(), window.location.reload())

            .then((data) => {
              // console.log(data);
              //  getPost();
            })
            .catch((error) => {});
        });
      }
    );
  };

  return (
    <div className>
      <Button onClick={handleOpen}>
        <img className="mainpage__uploadicon" src={uploadImage} alt="" />
      </Button>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Fade
            in={open}
            style={{
              backgroundColor: "white" /* light grey background */,
              maxWidth: "700px",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)" /* subtle shadow */,
            }}
          >
            <Box>
              <h1 className="postTitle">What's On Your Mind</h1>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="caption"
                label="Caption"
                name="caption"
                autoComplete="caption"
                autoFocus
                onChange={handleCaptionChange}
              />

              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />

              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>

              <Chip label={`${progressBar}%`} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Post
              </Button>
            </Box>
          </Fade>
        </form>
      </Modal>
    </div>
  );
};

export default AddPost;
