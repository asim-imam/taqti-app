// Represents the part of markup that has the multi-line textarea
// and its associated buttons (submit, keyboard img, paste samples)
import React from "react";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import KeyboardPic from "../kb_custom.png";
import Res from "../resources";
import { AppContext } from "../App";

const Input = props => {
  // read the context's value
  const context = React.useContext(AppContext);

  // initialize a couple of state variables
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [sampleIndex, setSampleIndex] = React.useState(
    Math.floor(Math.random() * Res.samples.length)
  );

  // This keeps the context synchronized with the UI inputs
  const trackRawInput = event => {
    context.setRawInput(event.target.value);
  };

  const populateSamplePoetry = () => {
    // read the verse at the current index:
    let sampleVerse = Res.samples[sampleIndex];
    // increment current index, unless it is at last index, in which case set to 0:
    let currIdx = sampleIndex;
    let maxIdx = Res.samples.length - 1;
    let nextIdx = currIdx === maxIdx ? 0 : currIdx + 1;
    setSampleIndex(nextIdx);
    // set the textarea's value to the sample text:
    context.setRawInput(sampleVerse);
  };

  const onInputChanged = event => {
    // Code adapted with some changes from https://github.com/awaisathar/yauk
    // modified to avoid the use of jQuery.
    let txt = event.target;
    let map = Res.charMapping;
    let last = "";
    let pos = txt.selectionEnd;
    let s = txt.value;
    let isLastPos = pos === s.length;
    if (last === s) return;
    let S = [];
    for (let x = 0; x < s.length; x++) {
      let c = s.charAt(x);
      S.push(map[c] || c);
    }
    txt.value = S.join("");
    last = txt.value;
    if (!isLastPos) {
      txt.selectionStart = txt.selectionEnd = pos;
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={isModalVisible}
        size="lg"
        onHide={() => setIsModalVisible(false)}
        centered
        dialogClassName="mymodal mymodal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center mymodal-title w-100">
            {Res.modalCaption}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mymodal-body-pic">
          <img
            src={KeyboardPic}
            alt="English to Urdu key mappings"
            title={Res.modalHoverText}
            width="100%"
            height="100%"
          />
        </Modal.Body>
      </Modal>

      <div className="container" dir="rtl">
        <div dir="rtl" style={{ position: "relative", float: "right" }}>
          <textarea
            id="poetryInput"
            autoCapitalize="none"
            onInput={onInputChanged}
            value={context.rawInput}
            onChange={trackRawInput}
            autoFocus
            className="input-text"
            rows="3"
            cols="50"
            placeholder={Res.placeHolderText}
          ></textarea>
          <span
            style={{
              position: "absolute",
              left: "0px"
            }}
          >
            <button
              type="button"
              onClick={() => context.setRawInput("")}
              className="btn btn-light btn-xs m-1 btn-erase"
              tabIndex={-1}
            >
              X
            </button>
          </span>
        </div>
      </div>
      <div className="container" dir="rtl">
        <div className="flex-row space-above" dir="rtl">
          <button
            type="button"
            className="btn btn-primary custom-btn custom-dark urdu"
            onClick={context.handleInputSubmit}
          >
            {Res.enterBtnCaption}
          </button>
          <button
            type="button"
            className="btn btn-secondary custom-btn custom-dark urdu"
            onClick={() => setIsModalVisible(true)}
          >
            {Res.keyLayoutBtnCaption}
          </button>
          <button
            type="button"
            className="btn btn-light custom-btn custom-light urdu"
            onClick={populateSamplePoetry}
          >
            {Res.captionSamplesBtn}
          </button>
          <button
            type="button"
            className="btn btn-outline-info custom-btn urdu"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            aria-controls="example-collapse-text"
            aria-expanded={isInfoOpen}
          >
            {Res.captionInfoBtn}
          </button>
        </div>
      </div>
      <Collapse in={isInfoOpen}>
        <div id="example-collapse-text">
          {Res.helpText}
          <span className="close-x-box">
            <button
              type="button"
              className="btn btn-link btn-sm close-x"
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={isInfoOpen}
            >
              X
            </button>
          </span>
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default Input;
