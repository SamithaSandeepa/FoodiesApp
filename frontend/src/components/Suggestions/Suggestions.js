import React, { useState, useEffect } from "react";
import "./Suggestions.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import ReactDom from "react-dom";
import UserProfile from "../UserProfile/UserProfile";

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("users")).uid;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.id !== currentUser
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

  const handleFollow = (userId) => {
    // axios
    //   .put(`http://localhost:8080/api/users/follow/${userId}`, {
    //     followerId: currentUser,
    //   })
    //   .then((response) => {
    //     // Update the user list to reflect the changes
    //     const updatedUsers = users.map((user) => {
    //       if (user.id === userId) {
    //         return { ...user, followers: [...user.followers, currentUser] };
    //       } else {
    //         return user;
    //       }
    //     });
    //     setUsers(updatedUsers);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const isFollowing = (userId) => {
    // userId;
    // const targetUser = users.find((user) => user.id === userId);
    // return targetUser.followers.includes(currentUser);
  };

  return (
    <div>
      <div className="suggestions__container">
        <div className="suggestions__header">
          <div>Suggestions For You</div>
        </div>
        <div className="suggestions__body">
          {users.map((user) => (
            <div key={user.id} className="suggestions__friends">
              <div
                onClick={() => handleProfilePage(user)}
                className="suggestions__container1"
              >
                <Avatar src={user.imagePath} className="suggestions__image" />
                <div className="suggestions__username">{user.userName}</div>
              </div>
              {isFollowing(user.id) ? (
                <button className="follow-button follow-button-gray">
                  Following
                </button>
              ) : (
                <button
                  className="follow-button follow-button-blue"
                  onClick={() => handleFollow(user.id)}
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
