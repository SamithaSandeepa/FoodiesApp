import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import "./Layout.css";

const Layout = ({ children, logout, isLoggedIn }) => {
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (footer) {
      const height = footer.offsetHeight;
      setFooterHeight(height);
    }
  }, []);

  const style = {
    minHeight: `calc(100vh - 50px)` /* subtract the height of your footer */,
    marginBottom: "30px",
  };
  return (
    <>
      {isLoggedIn && <NavBar logout={logout} isLoggedIn={isLoggedIn} />}
      <div className="container" style={style}>
        {children}
      </div>
      {isLoggedIn && (
        <div className="footer">
          <Footer logout={logout} isLoggedIn={isLoggedIn} />
        </div>
      )}
    </>
  );
};

export default Layout;
