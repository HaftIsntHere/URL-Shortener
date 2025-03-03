import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShortenedURL from "./ShortenedURL.tsx";

const RootComponent = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("https://searchbuddy.app/api/urls");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch URLs", error);
      }

      // if (urls && urls.error) {
      //   setUrls([]);
      // }
    };

    fetchUrls().then((a) => {
      setUrls(a);
      console.log(a);
    });
  }, []);

  console.log("a+", urls);
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/shortener" element={<App />} />
          {urls.map((url: { URL: string; shortenTo: string }) => (
            <Route
              key={url.URL}
              path={`/shortener/${url.URL}`}
              element={<ShortenedURL url={url.shortenTo} />}
            />
          ))}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);
