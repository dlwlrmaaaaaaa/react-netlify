import React, { useState, useEffect } from "react";
import axiosClient from "../axios";

const EmailVerify = () => {
  const [pin, setPin] = useState(0);
  const [countdown, setCountdown] = useState(0); // Countdown in seconds
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const email = userData ? userData.email : null;
  const sendPin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      pin: pin,
    };

    if (data.pin.length !== 6) {
      setError("It should be 6-digit-code. Please kindly check your email.")
      setTimeout(() => {
        setError(null)
      }, 3000);
    }

    axiosClient
      .post("/email/verify", data)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/home";
        }
      })
      .catch((err) => console.log("Error in sending pin: ", err));
  };

  const handleResendCodeClick = () => {
    // Start the 5-minute countdown
    setCountdown(300); // 5 minutes in seconds
    setIsResending(true);
  }

  const sendError = (irror) => {
    return (
      <span className="text-white bg-red-600 px-1 py-2 m-1 rounded-l-lg rounded-r-lg">{irror}</span>
    )
  }

  useEffect(() => {
    let intervalId;
    if (isResending && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(intervalId);
            setIsResending(false); // Countdown finished, make Resend Code clickable
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }

    // Clean up the interval when component unmounts or countdown is stopped
    return () => clearInterval(intervalId);
  }, [isResending, countdown]);


  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      <div className="bg-yellow-100 h-screen ">
        <form onSubmit={sendPin}>
          <div className="flex flex-col items-center">
            <h3 className='font-bold text-neutral-950 text-6xl ztext-center'>Please Verify Your Account</h3>
            <h6 className="font-sans text-neutral-950 text-2xl">Enter the 6-digit-code we sent through your e-mail address to verify your account</h6>
            {error !== null ? sendError(error) : null}
            <input
              type="text"
              value={pin === 0 ? "" : pin}
              required
              onChange={(e) => {
                const inputVal = e.target.value;
                if (inputVal.length <= 6) {
                  setPin(inputVal)
                }
              }} // Call handleChange function on change
              className="border border-gray-500 rounded-lg px-4 py-2 w-96 text-lg focus:outline-none focus:border-blue-500 text-center"
              placeholder="Enter the 6-digit code"
            />
            <div className="mt-6">
              {isResending ? (
                <span className=" ">Resend the code: {formattedTime}</span>
              ) : (
                <a href="#" className={` ${countdown > 0 ? 'pointer-events-none' : 'underline'}`} onClick={countdown === 0 ? handleResendCodeClick : undefined}>
                  Resend Code
                </a>
              )}
            </div>
            <button className="bg-[#918151] mt-10 text-white font-bold w-96 h-10 rounded-lg">VERIFY</button>
          </div>

        </form>
      </div>
    </>
  );
};

export default EmailVerify;
