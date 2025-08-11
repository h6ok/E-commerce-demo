import Input from "./Input";
import { FiInstagram } from "react-icons/fi";
import { FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-gray-200 bottom-0 overflow-hidden h-60 flex font-sans text-black">
      <div className="h-40 w-1/3 items-center flex flex-col">
        <div className="pt-10">2025 ©︎ Trek Japan</div>
        <div className="pt-10 grid grid-cols-3 gap-5">
          <FiInstagram />
          <FaFacebook />
          <FaYoutube />
        </div>
      </div>
      <div className="w-1/3 items-center flex flex-col">
        <ul className="pt-10 list-inside">
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Shipping + Duties & Taxes</li>
          <li>Exchanges and Returns Policy</li>
          <li>Privacy and Terms & Conditions</li>
          <li>Career</li>
        </ul>
      </div>
      <div className="w-1/3 items-center flex flex-col">
        <div className="text-base pt-10">NewsLetters</div>
        <div className="flex pt-5 justify-center items-center">
          <Input
            value="example@gmail.com"
            type="text"
            placeholder="email"
            className="h-auto w-auto text-lg"
            onChange={(e) => console.log(e)}
          />
          <div className="pl-3 text-xs text-white">
            <button className="bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
