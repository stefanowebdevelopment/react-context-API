import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/test", element: <p>TEST ROUTE</p> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
