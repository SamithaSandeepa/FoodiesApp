import React from "react";
import "./StatusBar.css";
import AddStatus from "../StatusCrud/AddStatus";
import UserStatus from "../StatusCrud/UserStatus";

const StatusBar = () => {
  return (
    <div>
      <div className="statusbar__container">
        <div className="fileupload">
          <AddStatus />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
