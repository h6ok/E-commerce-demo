import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="h-max">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
