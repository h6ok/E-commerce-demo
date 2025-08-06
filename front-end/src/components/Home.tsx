import { Outlet, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="h-24 bg-white flex font-sans text-2xl text-black">
        <div className="w-2/12 flex items-center justify-center">
          <div>
            <Link to="/">E-Commerce-Demo</Link>
          </div>
        </div>
        <div className="w-1/12  flex items-center justify-center">
          <Link to="/men">Men</Link>
        </div>
        <div className="w-1/12  flex items-center justify-center">
          <Link to="/women">Women</Link>
        </div>
        <div className="w-1/12  flex items-center justify-center">
          <Link to="/kids">Kids</Link>
        </div>
        <div className="w-5/12"></div>
        <div className="w-1/12  flex items-center justify-center">
          <FaUserLarge />
        </div>
        <div className="w-1/12  flex items-center justify-center">
          <FaShoppingCart />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
