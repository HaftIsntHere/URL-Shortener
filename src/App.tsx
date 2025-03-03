import { useState } from "react";
import "./App.css";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

function App() {
  const [isURLEntered, setURLEntered] = useState<boolean>(false);
  const [urlToShorten, setURLToShorten] = useState<string>("");
  const [shortenedURL, setShortenedURL] = useState<string>("");
  return (
    <>
      <h1 style={{ color: "black" }}>URL Shortener</h1>
      <p style={{ color: "#444", marginTop: "20px" }}>
        Enter a URL below and click 'Shorten URL' to get a shorter version.
      </p>

      <input
        type="text"
        placeholder="Enter URL"
        style={{
          width: "50%",
          height: "30px",
          padding: "10px",
          margin: "10px",
          borderRadius: "20px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => {
          const urlRegex = new RegExp(
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
          );
          if (urlRegex.test(e.currentTarget.value)) {
            setURLEntered(true);
            setURLToShorten(e.currentTarget.value);
          } else {
            setURLEntered(false);
            setURLToShorten("");
          }
        }}
      />

      <button
        style={{
          width: "50%",
          height: "30px",
          backgroundColor: "#2196F3",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onMouseDown={(e) => {
          if (isURLEntered) e.currentTarget.style.borderColor = "#1976D2";
          else e.currentTarget.style.borderColor = "red";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.borderColor = "transparent";
        }}
        onClick={() => {
          if (isURLEntered) {
            alert("URL Shortened");

            fetch(
              "https://searchbuddy.app/api/shortenURL?url=" + urlToShorten
            ).then((d) => d.json().then((d) => setShortenedURL(d.newURL)));
          } else {
            alert("Enter a valid URL");
          }
        }}
      >
        Shorten URL
      </button>
      <br />
      <a href={"https://"+ {shortenedURL}}>{shortenedURL}</a>
    </>
  );
}

export default App;
