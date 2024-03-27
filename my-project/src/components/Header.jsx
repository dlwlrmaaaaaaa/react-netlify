import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaCircleUser } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const Links = [
    { name: "HOME", path: "/home" },
    { name: "CONTACT US", path: "/contact_us" },
    { name: "ROOMS", path: "/available_rooms" },
    { name: "REVIEWS", path: "/reviews" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-bordColor z-50">
      <div className="md:px-10 py-3 px-6 md:flex justify-between items-center relative">
        <div className="flex text-2xl cursor-pointer items-center gap-2">
          <img src={logo} className="object-contain w-12" alt="Logo" />
        </div>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 absolute top-6 right-8 cursor-pointer md:hidden"
        >
          {isOpen ? <IoCloseSharp /> : <FaBars />}
        </div>

        {/* navlinks here */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 ${
            isOpen ? "block" : "hidden md:block"
          }`}
        >
          {Links.map((link, index) => (
            <li key={index} className="font-bold my-7 md:my-0 md:ml-8">
              <a
                href={link.src}
                className="text-notActText duration-500 hover:text-actText cursor-pointer"
              >
                {link.name}
              </a>
            </li>
          ))}
          <button className="bg-actNav text-sm font-bold text-white py-2 px-8 md:ml-8 rounded-full md:static transition duration-75 ease-in-out transform hover:scale-95">
            BOOK NOW
          </button>

          {/* dropdown */}
          <li
            className="font-semibold my-7 md:my-0 md:ml-8 relative"
            onClick={toggleDropdown}
          >
            <span className="cursor-pointer text-slate-500">
              <FaCircleUser size={30} />
            </span>
            {showDropdown && (
              <ul className="absolute top-full left-0 bg-white border border-gray-200 rounded-md mt-1 z-10">
                <li className="py-2 px-4 hover:bg-gray-100">
                  <a href="#" className="text-notActText">
                    Profile
                  </a>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <a href="#" className="text-notActText">
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
