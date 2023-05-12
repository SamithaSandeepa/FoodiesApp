import React, { useState } from "react";
import "./SignUp.css";
import Button from "@material-ui/core/Button";
import LoginPage from "../../views/LoginPage/LoginPage";
import { storage, auth } from "../../firebase";

function SignUp() {
  const [emailId, setEmailId] = useState(null);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const newSignUp = () => {
    console.log(emailId, name, userName, password);
    auth
      .createUserWithEmailAndPassword(emailId, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        let payload = {
          id: user.uid,
          userName: userName,
          name: name,
          emailId: emailId,
          password: password,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

        fetch("http://localhost:8080/api/users/save", requestOptions)
          .then((response) => response.json(), window.location.reload())
          .then((data) => {
            localStorage.setItem("users", JSON.stringify(user));
            // console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <input
        className="logipage__text"
        onChange={(event) => {
          setEmailId(event.currentTarget.value);
        }}
        type="text"
        placeholder="Mobile number or Email"
      />
      <input
        className="logipage__text"
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
        type="text"
        placeholder="Full Name"
      />
      <input
        className="logipage__text"
        onChange={(event) => {
          setUserName(event.currentTarget.value);
        }}
        type="text"
        placeholder="Username"
      />
      <input
        className="logipage__text"
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        type="password"
        placeholder="Password"
      />
      <Button
        className="login__button"
        onClick={newSignUp}
        variant="contained"
        style={{
          border: "1px solid #0395f6",
          backgroundColor: "#0395f6",
          hover: "#0395f6",
        }}
      >
        Sign up
      </Button>
    </div>
  );
}

export default SignUp;
