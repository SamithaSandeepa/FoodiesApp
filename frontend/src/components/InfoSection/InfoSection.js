import React, { useEffect, useState } from "react";
import "./InfoSection.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import ReactDom from "react-dom";
import UserProfile from "../UserProfile/UserProfile";

const InfoSection = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("users")).uid;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.id == currentUser
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  const handleProfilePage = (user) => {
    ReactDom.render(
      <UserProfile user={user} />,
      document.getElementById("root")
    );
  };

  return (
    <>
      {users.map((user) => (
        <div onClick={() => handleProfilePage(user)}>
          <div key={user.id} className="info__container">
            <Avatar src={user.imagePath} className="info__image" />
            <div className="info_content">
              <div className="info_username">{user.userName}</div>
              <div className="info_description">{user.aboutMe}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InfoSection;
