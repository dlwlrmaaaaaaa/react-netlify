import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import CryptoJS from "crypto-js";
import { Navigate } from "react-router-dom";
const Login = ({ setLogin }) => {
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState({ _Html: "" });
  const [url, setUrl] = useState(null);
  const [userData, setUserData] = useState({});
  // Toggle function to switch between Sign In and Sign Up

  const toggleSignIn = () => setSignIn(!signIn);

  useEffect(() => {
    axiosClient
      .get("http://localhost:8000/api/auth")
      .then((response) => {
        if (response) {
          return response.data;
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setUrl(data.url);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await axiosClient.post("/admin_login", data);
      if (res.status === 201) {
        const { auth_token } = res.data;
        localStorage.setItem("auth_token", auth_token);
        location.reload();
      }
    } catch (error) {
      console.error("Error in Login: ", error);
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      contact_number: contactNumber,
    };
    const res = axiosClient
      .post("/register", userData)
      .then((data) => {
        setUserData({ data });
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-mainBg">
      <div className="bg-white rounded-lg shadow-lg relative overflow-hidden w-full max-w-2xl min-h-[550px] mx-auto border border-cirlce">
        {/* Sign Up form */}
        {error._Html ? (
          <span className="text-white font-bold bg-red-400 w-full p-2 text-sm">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {error._Html}
          </span>
        ) : null}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${
            signIn ? "opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <form
            className="bg-white flex items-center justify-center flex-col py-0 px-12 h-full text-center"
            onSubmit={handleSignup}
          >
            <h1 className="font-bold text-actText mb-3">Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
            />
            <input
              type="text"
              name="email"
              required
              placeholder="Email Address"
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              name="password_confirmation"
              placeholder="Confirm Password"
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="contact_number"
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-full border border-bordColor bg-bordColor text-notActText text-sm font-bold py-3 px-9 my-2 uppercase transition duration-75 ease-in-out transform hover:scale-95 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In form */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20 ${
            !signIn ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <form
            className="bg-white flex items-center justify-center flex-col py-0 px-12 h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-actText mb-3">Sign In</h1>
            {error._Html ? (
              <span className="text-white font-bold bg-red-400 w-full p-2 text-sm">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {error._Html}
              </span>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
            />
            <a href="#" className="text-gray-800 text-sm my-4">
              Forgot your password?
            </a>
            {url != null && <a href={url}>Google Sign In</a>}
            <button className="rounded-full border border-bordColor bg-bordColor text-notActText text-sm font-bold py-3 px-9 my-2 uppercase transition duration-75 ease-in-out transform hover:scale-95 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container starts here */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-40`}
        >
          <div
            className={`bg-bordColor bg-gradient-to-r from-bordColor to-cirlce text-white h-full w-double transition-transform duration-600 ease-in-out`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center h-full w-full transition-transform duration-600 ease-in-out ${
                !signIn ? "translate-x-20%" : "-translate-x-full"
              }`}
            >
              <h1 className="font-bold">Already have an Account?</h1>
              <p className="mt-5 mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={toggleSignIn}
                className="rounded-full border border-white bg-transparent text-white text-sm font-bold py-3 px-9 uppercase transition duration-75 ease-in-out transform hover:scale-95 focus:outline-none"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center h-full w-full transition-transform duration-600 ease-in-out ${
                signIn ? "translate-x-20%" : "translate-x-full"
              }`}
            >
              <h1 className="font-bold">Don't have an Account yet?</h1>
              <p className="mt-5 mb-8">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={toggleSignIn}
                className="rounded-full border border-white bg-transparent text-white text-sm font-bold py-3 px-9 uppercase transition duration-75 ease-in-out transform hover:scale-95 focus:outline-none"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
