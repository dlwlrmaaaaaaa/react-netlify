import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaCircleUser } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom"; // Import NavLink
import { useStateContext } from "../contexts/contextProvider";

const Header = () => {
  const Links = [
    { name: "HOME", path: "/home" },
    { name: "CONTACT US", path: "/contact" },
    { name: "REVIEWS", path: "/reviews" },
  ];
  const { auth, roles, logout } = useStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout('/logout')
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

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 ${
            isOpen ? "block" : "hidden md:block"
          }`}
        >
          {Links.map((link, index) => (
            <li key={index} className="font-bold my-7 md:my-0 md:ml-8">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-actText"
                    : "text-notActText hover:text-actText"
                } // Dynamically set the class
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          <NavLink
            to="/home#availableRooms"
            className="bg-actNav text-sm font-bold text-white py-2 px-8 md:ml-8 rounded-full md:static transition duration-75 ease-in-out transform hover:scale-95"
          >
            BOOK NOW
          </NavLink>

          <li
            className="font-semibold my-7 md:my-0 md:ml-8 relative"
            onClick={toggleDropdown}
          >
            {auth && roles === 'user' && <>
                <span className="cursor-pointer text-slate-500">
                  <FaCircleUser size={30} />
                </span>
               {showDropdown && (
                <ul className="absolute top-full left-[-170%] bg-white border border-gray-200 rounded-md mt-1 z-10">
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to="/profile" className="text-notActText">
                      Profile
                    </NavLink>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100" onClick={handleLogout}>
                    <a href="#" className="text-notActText">
                      Logout
                    </a>
                  </li>
                </ul>
                )
              } 
              </>
              }
            {!auth &&  <NavLink
                to="/login"
                className="bg-actNav text-white px-5 py-1 rounded-l-full rounded-r-full"
              >
                Login
              </NavLink>}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
