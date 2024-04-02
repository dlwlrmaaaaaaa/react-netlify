import React from "react";
import logo from "../assets/logo.png";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute animate-custom-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-t-cirlce"></div>
      <img src={logo} alt="Logo" className="h-32 w-32" />
    </div>
  );
}

export default Loading;
