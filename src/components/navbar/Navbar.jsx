import { Link } from "react-router-dom";


export default function Navbar() {
  return(
    <section className="flex justify-between px-[2%] py-4">
      <p>Navbar component works!</p>
      <p>
        <Link to="/authentication">LOGIN</Link>
      </p>
    </section>
  );
}