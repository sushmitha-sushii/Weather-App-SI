import React from "react";
import ReactDOM from "react-dom/client"; // import from 'react-dom/client' in React 18+

import App from "./App";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
