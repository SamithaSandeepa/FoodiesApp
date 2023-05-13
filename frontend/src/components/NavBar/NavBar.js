import React from "react";
import "./NavBar.css";
import Grid from "@material-ui/core/Grid";
import { MenuItem, Avatar } from "@mui/material";
import { Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import insta_log from "../../images/FoodiesLogo.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import pp from "../../images/pp1.png";
import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NavBar = ({ logout, isLoggedIn }) => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (searchValue !== "") {
      fetchUsers();
    }
    // setUsers("");
  }, [searchValue]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/all`);
      const data = await response.json();
      console.log(data, "data");

      // Filter the users based on the search value
      const filteredUsers = data.filter((user) =>
        user.userName.toLowerCase().includes(searchValue.toLowerCase())
      );

      setUsers(filteredUsers);
      handleOpen(); // open the modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="navbar__barContent">
        <Grid container>
          <Grid item xs={2}>
            {" "}
          </Grid>
          <Grid item xs={2}>
            <a href="/">
              <img
                className="navbar_logo m-0 p-0"
                src={insta_log}
                width="105px"
              />
            </a>
          </Grid>
          <Grid item xs={2}>
            <div>
              <input
                type="text"
                className="navbar__searchBar"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {users.map((user) => (
                <div key={user.id} style={{ background: "red" }}>
                  {user.userName}
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={2} style={{ display: "flex", marginLeft: "100px" }}>
            <a href="/">
              <img className="navbar__img" src={home} width="25px" />
            </a>
            <img className="navbar__img" src={message} width="25px" />
            <img className="navbar__img" src={find} width="25px" />
            <img className="navbar__img" src={react} width="25px" />
          </Grid>
          <Grid item xs={1}>
            {isLoggedIn && (
              <div style={{ display: "flex", alignItems: "center", top: 0 }}>
                <Avatar
                  src={pp}
                  className="navbar__img"
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                />
                <Button
                  className=""
                  style={{ margin: 0 }}
                  onClick={handleLogout}
                  endIcon={<ExitToAppIcon />}
                >
                  Logout
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableEnforceFocus // add this prop to disable enforcing focus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {users.map((user) => (
              <MenuItem key={user.id} onClick={handleClose}>
                <a href={`/users/${user.id}`}>{user.name}</a>
              </MenuItem>
            ))}
          </div>
        </Fade>
      </Modal> */}
    </div>
  );
};

export default NavBar;
