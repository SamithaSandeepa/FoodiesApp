import React from "react";
import "./NavBar.css";
import Grid from "@material-ui/core/Grid";
import { MenuItem, Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import insta_log from "../../images/FoodiesLogo.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import pp from "../../images/pp1.png";
import { Button } from "@material-ui/core";

const NavBar = ({ logout, isLoggedIn }) => {
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
            <input
              text="text"
              className="navbar__searchBar"
              placeholder="Search"
            />
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
                  style={{ margin: 0, padding: 0 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <ExitToAppIcon
                  className="navbar__img"
                  style={{ marginLeft: "5px" }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NavBar;
