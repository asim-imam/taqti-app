// Represents the header for the app
import React from "react";
import Res from "../resources";

const Header = () => {
  return (
    <header>
      <span className="kufic big-logo">{Res.headerTitle}</span>
      <div className="kufic source-link">
        <button
          onClick={() => window.open("https://github.com/asim-imam/taqti-app")}
          type="button"
          className="btn btn-outline-light btn-source btn-sm"
        >
          {Res.captionSrcLink}
        </button>
      </div>
    </header>
  );
};

export default Header;
