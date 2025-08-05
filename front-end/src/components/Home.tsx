import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex-basic">
        <Link to="/">E-Commerce-Demo</Link>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
