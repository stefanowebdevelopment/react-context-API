import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import SummaryPage from "./pages/Summary";

import { BookingContext } from './store/booking-context.jsx'; 

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/summary", element: <SummaryPage /> }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
