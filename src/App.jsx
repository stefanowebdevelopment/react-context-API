import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import SummaryPage from "./pages/Summary";

import AuthenaticationPage, { action as loginEventAction } from "./pages/Authentication.jsx";
import ErrorGeneric from "./pages/errors/ErrorGeneric.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorGeneric />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "summary", element: <SummaryPage /> },
      { path: "authentication", element: <AuthenaticationPage/>, action: loginEventAction }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
