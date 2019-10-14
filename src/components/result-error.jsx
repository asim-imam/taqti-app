// Represents the error message shown when aruuz sends an error msg back
import React from "react";
import Res from "../resources";

const ResultError = () => {
  return (
    <React.Fragment>
      <div className="container" dir="rtl">
        <div className="flex-row" dir="rtl">
          <div className="badge-pill badge-primary m-1 badge-status fail">
            !
          </div>
          <div className="badge-pill badge-primary m-1 badge-metername">
            {Res.parseFailedMessage}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultError;
