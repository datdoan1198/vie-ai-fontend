import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {rootLoader} from "./rootLoader.js";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: ({request, params}) => rootLoader({request, params}, false),
  },
]);

export default router;
