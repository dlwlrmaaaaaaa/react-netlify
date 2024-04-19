import React from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const GoogleCallBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useStateContext();
  // itong code dito gagawan dapat ng isa pang file hindi ito dapat nandito para to sa GoogleCallBack.jsx
  useEffect(() => {
    axiosClient
      .get(`http://localhost:8000/api/auth/callback${location.search}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setToken(res.access_token);
        setUser(res.email);
        // navigate("/home");
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);
};

export default GoogleCallBack;
