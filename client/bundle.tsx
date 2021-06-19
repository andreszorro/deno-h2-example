import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/App.tsx";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  //@ts-ignore Document not present for bundle
  document.getElementById("root"),
);
