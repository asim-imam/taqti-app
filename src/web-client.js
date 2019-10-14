import axios from "axios";

export default class WebClient {
  // Given a multi-line string, breaks it up into an array of lines,
  // trims each line and only returns those lines that aren't all
  // whitespace
  static parseToArray(input) {
    let allLines = input.split("\n");
    // select only lines that aren't whitespace:
    let txtLines = allLines
      .filter(ln => ln.trim().length > 0)
      .map(ln => ln.trim());
    return txtLines;
  }

  static getTaqti(txtLines, handler) {
    // Using allOrigins site to bypass the CORS restriction that the
    // browser imposes (viz. preventing direct calls to the API on
    // aruuz.com because that site doesn't send the response header
    // to indicate that it permits requests from external domains).
    const allOriginsUrl = "https://api.allorigins.win/get";
    const textParam = txtLines.join("\n");
    const aruuzUrl =
      "http://aruuz.com/api/default/getislah?text=" +
      encodeURIComponent(textParam);
    axios
      .get(allOriginsUrl, {
        params: {
          url: aruuzUrl
        }
      })
      .then(function(response) {
        handler(response);
      })
      .catch(function(error) {
        console.log("WebClient.getTaqti:: error=" + error);
      });
  }
}
