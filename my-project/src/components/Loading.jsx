import React from "react";
import logo from "../assets/logo.png";

<<<<<<< HEAD
function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute animate-custom-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-t-cirlce"></div>
      <img src={logo} alt="Logo" className="h-32 w-32" />
=======
function Loading({height, width, loadingHeight, loadingWidth}) {
  return (
    <div className="flex justify-center items-center">
      <div className={`absolute animate-custom-spin rounded-full h-${loadingHeight} w-${loadingWidth} border-t-4 border-b-4 border-t-cirlce`}></div>
      <img src={logo} alt="Logo" className={`h-${height} w-${width}`}/>
>>>>>>> origin/main
    </div>
  );
}

export default Loading;
