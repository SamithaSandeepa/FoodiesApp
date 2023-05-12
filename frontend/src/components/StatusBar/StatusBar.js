import React from "react";
import "./StatusBar.css";
import AddStatus from "../StatusModal/AddStatus";
import UserStatus from "../StatusModal/UserStatus";

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
