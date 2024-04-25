import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import Redirecting from "../components/Redirecting"
const GoogleCallBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { setUsers, setAuth } = useStateContext();
  // itong code dito gagawan dapat ng isa pang file hindi ito dapat nandito para to sa GoogleCallBack.jsx
  useEffect(() => {
    axiosClient
      .get(`http://localhost:8000/api/auth/callback${location.search}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        localStorage.setItem('auth', true);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('roles', 'user');
        setUsers(res);
        setAuth(true);
        setLoading(false)
        navigate("/home");
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);

  return (
    <>
      {loading && <Redirecting />}
    </>
  );
};

export default GoogleCallBack;
