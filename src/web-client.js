import axios from "axios";

export default class WebClient {
  // Given a multi-line string, breaks it up into an array of lines,
  // trims each line and only returns those lines that aren't all
  // whitespace
  static parseToArray(input) {
    let allLines = input.split("\n");
    // select only lines that aren't whitespace:
    let txtLines = allLines
      .filter((ln) => ln.trim().length > 0)
      .map((ln) => ln.trim());
    return txtLines;
  }

  static getTaqti(txtLines, handler) {
    // Using cors-anywhere as a proxy to bypass CORS restriction:
    const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
    const textParam = txtLines.join("\n");
    const aruuzUrl =
      "http://aruuz.com/api/default/getislah/" + encodeURIComponent(textParam);
    // the URL to send the request to is a concat of the cors anywhere
    // with the actual target url:
    const reqUrl = corsAnywhereUrl + aruuzUrl;
    axios
      .get(reqUrl)
      .then(function (response) {
        handler(response);
      })
      .catch(function (error) {
        console.log("WebClient.getTaqti:: error=" + error);
      });
  }
}
