import type { ReactNode } from "react";
import LogoImg from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillNotification } from "react-icons/ai";

type HeaderElementProps = {
  label?: string;
  path: string;
  width: string;
  children?: ReactNode;
};

const baseStyle = "flex items-center justify-center";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  function HeaderElement({ label, path, width, children }: HeaderElementProps) {
    const style = `w-${width}/12 ${baseStyle}`;
    return (
      <div className={style}>
        <div
          className="cursor-pointer transition duration-700 ease-in-out hover:-translate-y-1 hover:scale-110"
          onClick={() => handleClick(path)}
        >
          {label}
          {children}
        </div>
      </div>
    );
  }

  function Logo() {
    return (
      <div>
        <img src={LogoImg} />
      </div>
    );
  }

  return (
    <div className="sticky top-0 overflow-hidden h-30 bg-white flex font-sans text-2xl text-black">
      <HeaderElement path="/home" width="2" children={<Logo />} />
      <HeaderElement label="Men" path="/men" width="1" />
      <HeaderElement label="Women" path="/women" width="1" />
      <HeaderElement label="Kids" path="/kids" width="1" />
      <div className="w-5/12"></div>
      <HeaderElement
        path="/notifications"
        width="1"
        children={<AiFillNotification />}
      />
      <HeaderElement path="/login" width="1" children={<FaUserLarge />} />
      <HeaderElement path="/cart" width="1" children={<FaShoppingCart />} />
    </div>
  );
}
