import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Users from "./pages/Users";
import Rooms from "./pages/Rooms";
import Sidebar from "./components/Sidebar";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GoogleCallBack from "./pages/GoogleCallBack";
import Loading from "./components/Loading";
import Payment from "./pages/Payments";
import Contact from "./pages/Contact";
import BookRoom from "./pages/BookRoom";
import EmailVerify from "./pages/EmailVerify";
import Feedbacks from "./pages/Feedbacks";
import Profile from "./pages/Profile";
import { useStateContext } from "./contexts/contextProvider";

const App = () => {
<<<<<<< HEAD
  const token = localStorage.getItem("auth_token");
  const token_type = "admin";

=======
  const { auth } = useStateContext();
>>>>>>> origin/main
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/email/verify" element={<EmailVerify />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/payment" element={<Payment />} />
        <Route path="/book" element={<BookRoom />} />
        <Route path="/reviews" element={<Feedbacks />} />
        <Route path="/google/callback" element={<GoogleCallBack />} />

<<<<<<< HEAD
      {token_type === "admin" ? (
        <main
          className={
            token
              ? "w-full bg-slate-200 h-screen flex justify-between items-start"
              : "hidden"
          }
        >
          <Sidebar />
          <Routes>
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
      ) : (
=======
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <main
        className={
          auth
            ? "w-full bg-slate-200 h-screen flex justify-between items-start"
            : "hidden"
        }
      >
        {auth ? <Sidebar /> : null}
>>>>>>> origin/main
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </main>
      {}
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
