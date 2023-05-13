import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
  Avatar,
  Chip,
} from "@material-ui/core";
import { storage } from "../../firebase";
import uploadimage from "../../images/statusadd.png";
import "./AddStatus.css";
import ReactDOM from "react-dom";
import QueueTwoToneIcon from "@mui/icons-material/QueueTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import EditStatus from "./EditStatus";
import { useStateContext } from "../../context/ContextProvider";
import { API_URL } from "../../config/index";

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

const AddStatus = () => {
  const [statusList, setStatusList] = useState([]);
  const [singleStatus, setSingleStatus] = useState("");
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [storyView, setStoryView] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("users")).uid;
  // console.log(currentUser);
  const [checked, setChecked] = React.useState(false);
  const { setLoading } = useStateContext();

  useEffect(() => {
    // setLoading(false);
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const requestOptions = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(`${API_URL}/api/story/all`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const filteredData = data.filter((item) => item.privacy === false);
        setStatusList(filteredData);
        // setLoading(false);
      });
  };

  // const getUser = () => {
  //   const requestOptions = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  //   fetch("http://localhost:8080/api/user/all", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setUserList(data);
  //     });
  // };

  const handleOpen = (item) => {
    // console.log(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStoryView = (status) => {
    // const status = statusList.find((status) => status.id === id);
    // console.log(status);
    setSingleStatus(status);
    setStoryView(true);
  };
  const handleStoryClose = () => {
    setStoryView(false);
  };

  const editorDelete = (item) => {
    ReactDOM.render(
      <EditStatus item={item} />,
      document.getElementById("root")
    );
  };

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
    setLoading(true);

    var uploadTask = storage.ref("story").child(file.name).put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {},
      function (error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log(downloadURL);

          let payload = {
            caption: caption,
            privacy: checked,
            userId: currentUser,
            path: downloadURL,
            timeStamp: new Date().getTime(),
          };
          // console.log(payload);
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(payload),
          };
          console.log("test");

          fetch("http://localhost:8080/api/story/save", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              getData();
              setOpen(false);
              // clear form
              setCaption("");
              setFile(null);
              setLoading(false);
              // alert("Story added successfully");
            })
            .catch((error) => {
              console.log(error, "error");
            });
        });
      }
    );
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          borderRadius: "30%",
          width: "55px",
          height: "55px",
          // backgroundColor: "#f2f2f2",
          marginLeft: "10px",
        }}
      >
        <QueueTwoToneIcon style={{ fontSize: 36 }} />
      </Button>

      {statusList.map((item, index) => (
        <Button
          key={index}
          onClick={() =>
            item.userId === currentUser
              ? editorDelete(item)
              : handleStoryView(item)
          }
        >
          <div className="status">
            <Avatar className="statusbar__status" src={item.path} />
            <div className="statusbar__text">{item.userName}</div>
          </div>
        </Button>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Fade in={open}>
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  // background colour white opacity 0.5
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <h2 style={{ marginBottom: "20px" }}>Upload Status</h2>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Caption"
                    multiline
                    maxRows={4}
                    style={{ marginBottom: "20px", marginRight: "20px" }}
                    value={caption}
                    onChange={handleCaptionChange}
                  />

                  <label
                    htmlFor="file-upload-status"
                    style={{
                      alignSelf: "center",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(to bottom, #d9d9d9, #f7f7f7)",
                      borderRadius: 0,
                      padding: "6px 12px",
                      cursor: "pointer",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                      border: "1px solid #ccc",
                      opacity: 0.8,
                    }}
                  >
                    <AddCircleTwoToneIcon
                      style={{ fontSize: 36, color: "#080808" }}
                    />
                    <span
                      style={{
                        marginLeft: 8,
                        color: "#080808",
                        fontWeight: "normal",
                      }}
                    >
                      Add New
                    </span>
                  </label>
                  <input
                    id="file-upload-status"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    // required
                  />
                </div>
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
                {file && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="story"
                      style={{
                        width: "200px",
                        height: "400px",
                        objectFit: "contain",
                        marginRight: "20px",
                      }}
                    />

                    <Button
                      onClick={() => setFile(null)}
                      style={{ alignSelf: "center" }}
                    >
                      <CancelTwoToneIcon style={{ fontSize: 36 }} />
                    </Button>
                  </div>
                )}

                <Button type="submit" style={{}}>
                  <Chip label="Submit" variant="outlined" />
                </Button>
              </div>
            </Box>
          </Fade>
        </form>
      </Modal>

      {/* Story View Modal */}
      <Modal
        className={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={storyView}
        onClose={handleStoryClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={storyView}>
          <Box
            sx={{
              backgroundColor: "#ffff",
              width: "90vw",
              height: "90vh",
              borderRadius: "10px",
              outline: "none",
              padding: "20px",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              overflow: "scroll",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2>{singleStatus.userName}</h2>

              <Button onClick={handleStoryClose}>
                <CancelTwoToneIcon style={{ fontSize: 36 }} />
              </Button>
            </div>
            <img
              style={{
                maxWidth: "50%",
                maxHeight: "595px",
                height: "auto",
                display: "block",
                margin: "auto",
              }}
              src={singleStatus.path}
              alt="story"
            />
            <h1 className="singleCaption">{singleStatus.caption}</h1>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default AddStatus;
