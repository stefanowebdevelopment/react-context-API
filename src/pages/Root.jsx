import { Outlet } from "react-router-dom";


export default function RootLayout() {
  return(
    <>
      <p>RootLayout</p>
      <Outlet />
    </>
  )
}