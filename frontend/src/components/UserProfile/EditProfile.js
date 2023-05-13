import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import defaultImage from "../../images/pp1.png";
import { storage } from "../../firebase";
import NavBar from "../NavBar/NavBar";

const EditProfile = ({ user }) => {
  console.log(user, "user");
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  console.log(address, "address");
  // const [city, setCity] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (!file) {
      alert("Please select a file");
      return;
    }
    var uploadTask = storage.ref("user").child(file.name).put(file);
    uploadTask.on(
      "state_changed",
      function (snapshot) {},
      function (error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setProfilePicture(downloadURL);
          // console.log(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!file) {
    //   alert("Please select a file");
    //   return;
    // }

    // var uploadTask = storage.ref("user").child(file.name).put(file);

    // uploadTask.on(
    //   "state_changed",
    //   function (snapshot) {},
    //   function (error) {},
    //   () => {
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       console.log(downloadURL);
    //       setProfilePicture(downloadURL);
    let payload = {
      userName: userName,
      name: name,
      emailId: email,
      // phone: phone,
      address: address,
      aboutMe: aboutMe,
      imagePath: profilePicture,
      password: password,
      timeStamp: new Date().getTime(),
    };
    console.log(payload, "ayload.userName");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/api/users/update/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("User updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error, "error");
      });
    // });
    // }
    // );
  };

  const handleLogout = () => {
    localStorage.removeItem("users");
  };

  const handleDeleteProfile = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(`http://localhost:8080/api/users/delete/${user.id}`, requestOptions)
      .then((response) => {
        // handle success
        console.log("User deleted successfully");
        window.location.reload();
        handleLogout();
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  useEffect(() => {
    if (user) {
      setProfilePicture(user.imagePath);
      setUserName(user.userName);
      setName(user.name);
      setEmail(user.emailId);
      setPhone(user.phone);
      setAddress(user.address);
      // setCity(user.city);
      setAboutMe(user.aboutMe);
      setPassword(user.password);
    }
    console.log(address, "address");
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h1 className="profile-title">Edit Profile</h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-picture-container">
            {profilePicture ? (
              <img
                className="profile-picture"
                src={profilePicture}
                alt="Profile"
              />
            ) : (
              <div className="profile-picture-placeholder">
                {/* <AddIcon className="profile-picture-icon" /> */}
                <img
                  src={defaultImage}
                  alt="Profile"
                  className="profile-picture"
                />
                {/* <span>Upload a Profile Picture</span> */}
              </div>
            )}
            <label
              htmlFor="profile-picture-input"
              className="profile-picture-label"
            >
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-picture-input"
              onChange={handleFileChange}
              className="profile-picture-input"
            />
          </div>
          <div className="profile-form-row">
            <label className="profile-form-label">User Name:</label>
            <input
              className="profile-form-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label className="profile-form-label">Full Name:</label>
            <input
              className="profile-form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label className="profile-form-label">Email:</label>
            <input
              className="profile-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className="profile-form-row">
          <label className="profile-form-label">Phone:</label>
          <input
            className="profile-form-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div> */}
          <div className="profile-form-row">
            <label className="profile-form-label">Address:</label>
            <input
              className="profile-form-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label className="profile-form-label">About Me:</label>
            <textarea
              className="profile-form-input"
              type="text"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>
          <div className="profile-form-row">
            <label className="profile-form-label">Password:</label>
            <div className="password-input-container">
              <input
                className="profile-form-input password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="password-toggle-button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>

          <button
            className="profile-save-button"
            type="submit"
            // onClick={handleSubmit}
          >
            Save
          </button>
        </form>
        <button
          className="profile-delete-button"
          type="button"
          onClick={handleDeleteProfile}
        >
          <DeleteIcon className="profile-delete-icon" />
          Delete Profile
        </button>
      </div>
    </>
  );
};

export default EditProfile;
