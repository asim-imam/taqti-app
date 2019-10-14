// Represents the markup to show successful taqti for one line of poetry
import React from "react";

const ResultParsedLine = props => {
  return (
    <React.Fragment>
      <div className="container" dir="rtl">
        <div className="flex-row space-above" dir="rtl">
          {props.result.words.map((word, idx) => (
            <div className="badge badge-primary m-1 badge-token">
              <p>{word}</p>
              <p className="token-box">{props.result.codes[idx]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container" dir="rtl">
        <div className="flex-row" dir="rtl">
          <div className="badge-pill badge-primary m-1 badge-status pass">
            &#10003;
          </div>
          <div className="badge-pill badge-primary m-1 badge-metername">
            {props.result.feet}
          </div>
          <div className="badge-pill badge-primary m-1 badge-metername">
            {props.result.meterName}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultParsedLine;
