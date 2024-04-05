
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import { useStateContext } from "./contexts/contextProvider";
import Profile from "./pages/Profile";

const App = () => {
  const {user, token} = useStateContext();
  return (
    <>
      <Routes>
        <Route  path="/google/callback" element={<GoogleCallBack />} />
        <Route path="/home" element={<Home />} />
        <Route path="/email/verify" element={<EmailVerify />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/payment" element={<Payment />} />
        <Route path="/reviews" element={<Feedbacks />} />
        <Route path="/book" element={<BookRoom />} />
        <Route path="/email/verify" element={<EmailVerify />} />    
        <Route path="/login" element={ <Login />} />
        <Route path="/profile" element={ <Profile />} />
      </Routes>
      <main className={token ? "w-full bg-slate-200 h-screen flex justify-between items-start" : "hidden"} >
          {token ? <Sidebar /> : null}
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard />                 
              }
            />
            <Route
              path="/inbox"
              element={<Inbox /> 
              }
            />
            <Route
              path="/users"
              element={<Users /> 
              }
            />
            <Route
              path="/rooms"
              element={ <Rooms /> 
              }
            />
            <Route
              path="/reservation"
              element={ <Reservation /> }
            />
          </Routes>
        </main>
      {/* <Profile /> */}
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
