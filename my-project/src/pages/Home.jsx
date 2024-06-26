import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import br1 from "../assets/br1.jpg";
import br2 from "../assets/br2.jpg";
import { Link } from "react-router-dom";

import rooms from "../JSON/Room.json";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axios";
import getRooms from "./axios/getRoom";
import Arrow from '../assets/arrow.svg';
const Home = () => {
  const navigate = useNavigate();
  // Mapping identifiers to actual image imports
  const imageMap = {
    br1: br1,
    br2: br2,
  };
  const [translate, setTranslate] = useState("translate-x-[50%]");
  const [rooms, setRooms] = useState([])
  const [image, setImage] = useState([])
  const location = useLocation();
  const [isSlide, setSlide] = useState(false)
  useEffect(() => {
    getRooms()
      .then((res) => {
        localStorage.removeItem("room");
        return res.data;
      })
      .then((res) => {
        setRooms(res.data);
      });
  }, []);

  const checkRoom = (id) => {
    console.log(id)
    axiosClient
      .get("/room/" + id)
      .then((res) => {
        return res.data.data;
      })
      .then((res) => {
        localStorage.setItem("room", JSON.stringify(res));
        localStorage.setItem("room_id", JSON.stringify(res.id))
        navigate("/book");
      })
      .catch((err) => {
        console.log(err);
        // localStorage.removeItem("room");
        // window.location.reload();
      });
  };

  const renderImage = (room, room_id) => {
    const file_name = JSON.parse(room.file_name)[0];
    return (
      <img
        src={`http://localhost:8000/storage/images/${file_name}`}
        className="object-cover w-full h-full px-1 py-1"
        alt={room.room_name}
        key={room_id}
        onClick={(e) => {
          e.preventDefault();
          checkRoom(room_id);
        }}
      ></img>
    );
  };

  const slide = () => {
    if (!isSlide) {
      setTranslate("translate-x-[134%]")
      setSlide(true)
    }
    if (isSlide) {
      setTranslate("translate-x-[50%]")
      setSlide(false)
    }
   
  }
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Header />
      <div className="w-full grow bg-backColor h-auto flex flex-col justify-start items-center">
        {/* image slider */}
        <div className="w-full m-auto">
          <Carousel />
        </div>

        <div
          id="availableRooms"
          className="flex items-center justify-center border-actNav"
        >
          <h1 className="text-actText text-4xl font-bold m-5">
            Available Rooms
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2 mt-3 mb-5 p-3 justify-center " >
          {rooms.map((room) => (
            <div
              id="rooms"
              className="flex justify-center cursor-pointer p-4"
              key={room.id}
            >
              <div
                id="roomEdit"
                className="lg:w-4/5 w-full  h-full  relative bg-white rounded-xl Rounded-xl gap-4 
                    border transfrom duration-75 ease-in-out transform  hover:scale-105 shadow-xl"
              >
                {/* <Link to="/book"> */}
                {renderImage(room, room.id)}
                <div className={`absolute  h-full w-3/4 px-1 py-2  hover:transition-all flex flex-col border-none -z-10 ${translate} hover:opacity-100`}
                onClick={slide}>
                  <label htmlFor="">Room #: {room.room_name} </label>
                  <label htmlFor="">Price: {room.price} </label>
                  <label htmlFor="">Max Guest: {room.maximum_guest} </label>
                      
               </div>
                
                {/* </Link> */}
              </div>
              +
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
