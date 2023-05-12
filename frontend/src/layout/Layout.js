import React from "react";
import NavBar from "../components/NavBar/NavBar";

const Layout = ({ children, logout, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && <NavBar logout={logout} isLoggedIn={isLoggedIn} />}
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
