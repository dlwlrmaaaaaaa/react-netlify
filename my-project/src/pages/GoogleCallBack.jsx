import React from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  // itong code dito gagawan dapat ng isa pang file hindi ito dapat nandito para to sa GoogleCallBack.jsx
  useEffect(() => {
    axiosClient
      .get(`http://localhost:8000/api/auth/callback${location.search}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log("ERROR: ", error.response));
  }, []);
};

export default Home;
