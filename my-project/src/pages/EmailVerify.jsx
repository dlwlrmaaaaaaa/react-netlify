import React, { useState } from "react";
import axiosClient from "../axios";

const EmailVerify = () => {
  const [pin, setPin] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const email = userData.email;
  const sendPin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      pin: pin,
    };
    axiosClient
      .post("/email/verify", data)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/home";
        }
      })
      .catch((err) => console.log("Error in sending pin: ", err));
  };

  return (
    <>
      <form onSubmit={sendPin}>
        <div className="flex">
          <input
            type="text"
            className="border px-2 py-1"
            placeholder="Enter 6 digit code"
            onChange={(e) => setPin(e.target.value)}
            value={pin}
          />{" "}
          <button type="sumit" className="border m-1 px-1 hover:bg-blue-500">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EmailVerify;
