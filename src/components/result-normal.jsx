import React from "react";
import ResultParsedLine from "./result-parsed-line";
import ResultUnparsedLine from "./result-unparsed-line";

// Represents the markup to show generic taqti results for all the inputted lines of poetry
// which it does by rendering the specific sub-components for parsed and unparsed lines
const ResultNormal = props => {
  const { outputRows } = props;
  return (
    <React.Fragment>
      {outputRows.map(row =>
        row.error.includes(true) ? (
          <ResultUnparsedLine result={row} />
        ) : (
          <ResultParsedLine result={row} />
        )
      )}
      <div className="container" dir="rtl">
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <button
            type="button"
            onClick={() => window.scrollTo(0, 0)}
            className="btn btn-secondary btn-xs btn-up"
          >
            &#x2191;
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultNormal;
