// Represents the header for the app
import React from "react";
import Res from "../resources";

const Header = () => {
  return (
    <header>
      <div className="kufic big-logo">{Res.headerTitle}</div>
    </header>
  );
};

export default Header;
