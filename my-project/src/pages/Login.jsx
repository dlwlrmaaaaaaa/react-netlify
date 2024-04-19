import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import EmailVerify from "./EmailVerify";
import { useStateContext } from "../contexts/contextProvider";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import LoadingUI from '../components/Loading'
const Login = () => {
  const { login, setUser } = useStateContext();

  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Loading, userLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({ _Html: "" });
  const [error, setError] = useState({ _Html: "" });
  const [url, setUrl] = useState(null);
  const toggleSignIn = () => setSignIn(!signIn);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = (inputField) => {
    if (inputField === 1) {
      setShowPassword1(!showPassword1);
    } else if (inputField === 2) {
      setShowPassword2(!showPassword2);
    } else if (inputField === 3) {
      setShowPassword3(!showPassword3);
    }
  };


  const googleLogin = () => {
    axiosClient
      .get("/auth")
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
    setLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      googleLogin();
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userLoading(true)
    // const data = {
    //   email: email,
    //   password: password,
    // };

    login({email, password});
      
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // at least 8 characters long and contains at least one number and one symbol
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (password !== passwordConfirmation) {
      setErrors({ ...errors, _Html: "Password does not match" });
      return;
    }
    if (!passwordPattern.test(password)) {
      setErrors({
        ...errors,
        _Html:
          "Password must be at least 8 characters long, include at least one symbol and one number.",
      });
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      contact_number: contactNumber,
    };
    axiosClient
      .post("/register", userData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setToken(data.token);
        setUser({ email: data.email });
        navigate("/email/verify");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422 && response.data.errors.email) {
          // Email is already taken
          setErrors({
            ...errors,
            _Html:
              "This email is already taken. Please choose a different one.",
          });
        } else {
          console.log("Error during signup:", error);
        }
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-mainBg">
        <div className="bg-white rounded-lg shadow-lg relative overflow-hidden w-full lg:max-w-2xl md:max-w-xl max-w-md min-h-[550px] mx-auto border border-cirlce">
          {/* Sign Up form */}
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
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type={showPassword1 ? "text" : "password"}
                  required
                  placeholder="Password"
                  name="password"
                  className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(1)}
                  className="text-sm text-notActText hover:text-actText"
                >
                  <IoMdEye size={20} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type={showPassword2 ? "text" : "password"}
                  required
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(2)}
                  className="text-sm text-notActText hover:text-actText"
                >
                  <IoMdEye size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                name="contact_number"
                className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
                onChange={(e) => setContactNumber(e.target.value)}
              />
              {errors._Html ? (
                <span className="text-white font-semibold rounded-lg bg-red-400 w-full p-1 m-1 text-sm gap-2 flex items-center justify-center">
                  <i className="text-white">
                    <FaExclamationTriangle size={20} />
                  </i>
                  {errors._Html}
                </span>
              ) : null}
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
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
              />
              <div className="flex gap-2">
                <input
                  type={showPassword3 ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-200 rounded-md border-none p-3 my-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(3)}
                  className="text-sm text-notActText hover:text-actText"
                >
                  <IoMdEye size={20} />
                </button>
              </div>
              {error._Html ? (
                <span className="text-white font-semibold rounded-lg bg-red-400 w-full p-1 m-1 text-sm flex items-center justify-center">
                  <i className="text-white">
                    <FaExclamationTriangle size={20} />{" "}
                  </i>
                  {error._Html}
                </span>
              ) : null}
              <a
                href="#"
                className="text-notActText text-sm font-semibold my-4 hover:text-actText hover:font-semibold"
              >
                Forgot your password?
              </a>
              {url != null && (
                <a
                  href={url}
                  className="font-bold text-actText my-2 hover:text-blue-700 "
                >
                  Google Sign In
                </a>
              )}
              <button className="rounded-full border border-bordColor bg-bordColor text-notActText text-sm font-bold py-3 px-9 my-2 uppercase transition duration-75 ease-in-out transform hover:scale-95 focus:outline-none">
               {Loading && <LoadingUI height="8" width="8" loadingHeight="12" loadingWidth="12"/>}
               {!Loading && "Sign in"}           
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
    </>
  );
};

export default Login;
