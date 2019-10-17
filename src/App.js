import React from "react";
import "./App.css";
import Res from "./resources";
import Modal from "react-bootstrap/Modal";
import Header from "./components/header";
import CaptionRow from "./components/caption-row";
import Input from "./components/input";
import Results from "./components/results";
import WebClient from "./web-client";
import Spinner from "react-bootstrap/Spinner";

// Just need one context throughout the app
export const AppContext = React.createContext();

const App = () => {
  // App state variables:
  const [isWarnVisible, setIsWarnVisible] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [resultsReceived, setResultsReceived] = React.useState(false);
  const [rawInput, setRawInput] = React.useState("");
  const [rawResult, setRawResult] = React.useState(null);
  const [inputLines, setInputLines] = React.useState([]);

  // Callback to update state with the results from API call:
  const handleResponseReceived = response => {
    try {
      let allOriginsHTTPCode = response.status;
      let aruuzHTTPCode = response.data.status.http_code;
      let responseBody = response.data.contents;
      let retval = {
        status: Math.max(allOriginsHTTPCode, aruuzHTTPCode),
        body: responseBody
      };
      setRawResult(retval);
    } finally {
      // Ensure the progress bar is not shown indefinitely
      setFetching(false);
    }
  };

  // Event handler for submit button click:
  const handleInputSubmit = () => {
    try {
      setFetching(true);
      setResultsReceived(false);
      let arr = WebClient.parseToArray(rawInput);
      setInputLines(arr);
      if (arr.length === 0) {
        setFetching(false);
        setIsWarnVisible(true);
      } else {
        // Input was at least one line of text or more
        // so continue on to making the API call:
        WebClient.getTaqti(arr, handleResponseReceived);
        setResultsReceived(true);
      }
    } finally {
    }
  };

  // ctxItems is just a vessel for aggregating the state variables,
  // their setters and anything else (e.g. functions used for event
  // handling) that we want to expose via the app context.
  // NOTE:
  // I've used the Context API in this app only for practice; it has
  // a shallow enough component tree that props would also work well.
  // Some leaf-level components do not in fact consume the AppContext.
  const ctxItems = {
    // misc state variables:
    rawInput,
    rawResult,
    inputLines,
    // setter for text input:
    setRawInput,
    // handler for submit btn:
    handleInputSubmit
  };

  return (
    <AppContext.Provider value={ctxItems}>
      <Modal
        show={isWarnVisible}
        onHide={() => setIsWarnVisible(false)}
        centered
        dialogClassName="mymodal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center mymodal-title w-100">
            {Res.warningModalCaption}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mymodal-body">
          {Res.warningModalMessage}
        </Modal.Body>
      </Modal>
      <Header />
      <CaptionRow captionText={Res.topCaption} />
      <Input />
      {fetching && (
        <Spinner id="spinner" animation="border" variant="secondary" />
      )}
      {//Only render markup for results when fetching is done and results have
      // been updated into the state variables (which is done async by React):
      resultsReceived && rawResult && !fetching && <Results />}
    </AppContext.Provider>
  );
};

export default App;
