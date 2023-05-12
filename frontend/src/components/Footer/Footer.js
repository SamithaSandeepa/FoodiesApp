import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </div>
      {/* <div className="footer__center">
        <button>
          <i className="fas fa-plus"></i>
        </button>
        <button>
          <i className="fas fa-home"></i>
        </button>
        <button>
          <i className="fas fa-search"></i>
        </button>
        <button>
          <i className="fas fa-user"></i>
        </button>
      </div> */}
      <div className="footer__social-icons">
        <a href="#">
          <i className="fab fa-facebook-square"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter-square"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram-square"></i>
        </a>
        <a href="#">
          <i className="fab fa-pinterest-square"></i>
        </a>
      </div>
      <p className="footer__text">
        &copy; 2023 Foodies, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
