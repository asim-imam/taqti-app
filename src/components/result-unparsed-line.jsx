// Represents the markup to show failed taqti attempt for one line of poetry
import React from "react";
import Res from "../resources";

const ResultUnparsedLine = props => {
  return (
    <React.Fragment>
      <div className="container" dir="rtl">
        <div className="flex-row space-above" dir="rtl">
          <div className="badge badge-primary m-1 badge-token">
            <p>{props.result.originalLine}</p>
          </div>
        </div>
      </div>
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

export default ResultUnparsedLine;
