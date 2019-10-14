// Represents the aggregate fragment containing all of the result items
import React from "react";
import Res from "../resources";
import CaptionRow from "./caption-row";
import { AppContext } from "../App";
import ResultError from "./result-error";
import ResultNormal from "./result-normal";
import ResultException from "./result-exception";

const Results = () => {
  const context = React.useContext(AppContext);
  const isHttpOK = context.rawResult.status === 200;
  const bodyObj = JSON.parse(context.rawResult.body);
  const isTaqtiError = isHttpOK && bodyObj && bodyObj.Result === "ERROR";
  const hasResults = isHttpOK && bodyObj && !isTaqtiError;

  return (
    <React.Fragment>
      <CaptionRow captionText={Res.resultCaption} />
      {// CASE 1: We did not receive an HTTP OK response: show a technical error message
      !isHttpOK && <ResultException />}
      {// CASE 2: Response was OK, but response had Result = error: show an error message
      isTaqtiError && <ResultError />}
      {// CASE 3: The normal case; taqti results received: show the taqti results
      hasResults && (
        <ResultNormal
          outputRows={Array.isArray(bodyObj) ? bodyObj : [].concat(bodyObj)}
        />
      )}
    </React.Fragment>
  );
};

export default Results;
