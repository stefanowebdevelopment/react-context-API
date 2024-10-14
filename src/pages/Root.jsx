import { Outlet } from "react-router-dom";
import BookingContextProvider from "../store/booking-context";


export default function RootLayout() {
  return(
    <BookingContextProvider>
      <p>RootLayout</p>
      <Outlet />
    </BookingContextProvider>
  )
}

