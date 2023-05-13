import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import NavBar from "../NavBar/NavBar";
import defaultImage from "../../images/pp1.png";
import UserStatus from "../StatusCrud/UserStatus";
import EditProfile from "./EditProfile";
import ReactDom from "react-dom";
import { json } from "react-router-dom";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const currentUserId = JSON.parse(localStorage.getItem("users")).uid;
  console.log(currentUserId, "currentUserId");
  console.log(user, "userProfle");

  useEffect(() => {
    // Fetch all posts from API endpoint
    fetch("http://localhost:8080/api/posts/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredPosts = data.filter((post) => post.userId === user.id);
        setPosts(filteredPosts);
        // console.log(filteredPosts, "filteredPosts");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  const handleProfileEdit = (user) => {
    ReactDom.render(
      <EditProfile user={user} />,
      document.getElementById("root")
    );
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        {/* Profile header */}
        <div className="profile-header">
          <div className="profile-image">
            {/* <img src={user.imagepath} alt="Profile Image" /> */}
            <img
              src={user.imagePath || defaultImage}
              alt="Profile Image"
              // className={classes.profileImage}
            />
          </div>
          <div className="profile-info">
            <div className="username-container">
              <h2 className="profile-username">{user.userName}</h2>
              <p className="description">{user.aboutMe}</p>
            </div>
            {/* <div className="description-container"></div> */}
            <div className="profile-stats">
              <div className="stat">
                <span className="count">{posts.length}</span>
                <span className="label">posts</span>
              </div>
              <div className="stat">
                <span className="count">0</span>
                <span className="label">followers</span>
              </div>
              <div className="stat">
                <span className="count">0</span>
                <span className="label">following</span>
              </div>
              {currentUserId === user.id ? (
                <button
                  className="edit-profile-btn"
                  onClick={() => handleProfileEdit(user)}
                >
                  Edit Profile
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="statusbar__container"
          style={{
            marginTop: 0,
            marginBottom: "35px",
          }}
        >
          <div>
            <UserStatus user={user} />
          </div>
        </div>
        {/* Gallery */}
        <div
          className="gallery-container"
          style={{ borderTop: "2px solid rgb(31, 28, 28)" }}
        >
          <div className="gallery">
            {/* Map through posts and render images */}
            {posts.map((post) => (
              <img
                key={post.id}
                className="gallery-item"
                src={post.imagePath}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
