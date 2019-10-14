// Represents one DIV occupying a row just for caption text

import React from "react";

const CaptionRow = props => {
  return (
    <div className="container" dir="rtl">
      <div className="caption urdu">
        <p className="urdu">{props.captionText}</p>
      </div>
    </div>
  );
};

export default CaptionRow;
