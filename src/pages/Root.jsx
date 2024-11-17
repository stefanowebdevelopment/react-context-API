import { Outlet } from "react-router-dom";
import BookingContextProvider from "../store/booking-context";
import Navbar from "../components/navbar/Navbar";


export default function RootLayout() {
  return(
    <BookingContextProvider>
      <Navbar  />
      <Outlet />
    </BookingContextProvider>
  )
}

