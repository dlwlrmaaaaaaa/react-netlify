import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Users from "./pages/Users";
import Rooms from "./pages/Rooms";
import Sidebar from "./components/Sidebar";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GoogleCallBack from "./pages/GoogleCallBack";
const App = () => {
  const token = localStorage.getItem("auth_token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/google/callback" element={<GoogleCallBack />} />
          <Route
            path="/login"
            element={
              token ? <Navigate to="/dashboard" replace={true} /> : <Login />
            }
          />
        </Routes>
        <main
          className={
            token
              ? "w-full bg-slate-200 h-screen flex justify-between items-start"
              : "hidden"
          }
        >
          <Sidebar />
          <Routes>
            <Route path="/" element={<NotFound />} />
            <Route
              path="/dashboard"
              element={
                token ? (
                  <Dashboard token={token} />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/inbox"
              element={
                token ? <Inbox /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route
              path="/users"
              element={
                token ? <Users /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route
              path="/rooms"
              element={
                token ? <Rooms /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route
              path="/reservation"
              element={
                token ? (
                  <Reservation />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;

function NotFound() {
  return (
    <div className="flex items-center justify-center ">
      <h2>404 Not Found</h2>
    </div>
  );
}
