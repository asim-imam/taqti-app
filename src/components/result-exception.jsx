import React from "react";
import Res from "../resources";

const ResultException = () => {
  return (
    <React.Fragment>
      <div className="container" dir="rtl">
        <div className="flex-row" dir="rtl">
          <div className="badge-pill badge-primary m-1 badge-status fail">
            !
          </div>
          <div className="badge-pill badge-danger m-1 badge-exception">
            {Res.parseExceptionMessage}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultException;
