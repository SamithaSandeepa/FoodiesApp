import React, { useState } from "react";
import "../../views/LoginPage/LoginPage.css";
import { auth } from "../../firebase";
import Button from "@material-ui/core/Button";

function SignIn() {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    console.log(emailId, password);
    auth
      .signInWithEmailAndPassword(emailId, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem("users", JSON.stringify(user));
        window.location.reload();
        // ...
      })
      .catch((error) => {
        alert(error);
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
        placeholder="Enter email"
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
        variant="contained"
        onClick={login}
        style={{ border: "1px solid #0395f6", backgroundColor: "#0395f6" }}
      >
        Log In
      </Button>
    </div>
  );
}

export default SignIn;
