import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App, { preloadCurrentPage } from "@/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Fetch the current page's code first so the app replaces the prerendered HTML in one step
preloadCurrentPage().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
