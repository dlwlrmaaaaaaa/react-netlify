import React from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const GoogleCallBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUsers, setAuth, setRoles } = useStateContext();
  // itong code dito gagawan dapat ng isa pang file hindi ito dapat nandito para to sa GoogleCallBack.jsx
  useEffect(() => {
    axiosClient
      .get(`http://localhost:8000/api/auth/callback${location.search}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setUsers(res.user);
        setRoles(res.user.role);
        setAuth(true);
        localStorage.setItem('auth', true);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', "user");
        navigate("/home");
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);
};

export default GoogleCallBack;
