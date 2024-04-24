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

const Home = () => {
  const navigate = useNavigate();
  // Mapping identifiers to actual image imports
  const imageMap = {
    br1: br1,
    br2: br2,
  };
  const [rooms, setRooms] = useState([])
  const [image, setImage] = useState([])
  const location = useLocation();

  useEffect(() => {
    getRooms().then(res => {
      return res.data;
    })
    .then((res) => {
      setRooms(res.data);
    })
  }, [])
  
  useEffect(() => {
    console.log(rooms);
    console.log(image);
  }, [rooms, image])

  const renderImage = (room) => {
    const file_name = JSON.parse(room.file_name)[0];
      return (
        <img
           src={`http://localhost:8000/storage/images/${file_name}`}
                className="object-cover w-full h-3/4 rounded-xl"
                alt={room.room_name}
        ></img>
      )
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
     
        <div className="grid lg:grid-cols-3 grid-cols-2 mt-3 p-3 justify-center">
       {rooms.map((room) => (
          <div id="rooms" className="flex justify-center" key={room.id}>
          <div
            id="roomEdit"
            className="lg:w-4/5 w-full lg:h-[100%]  h-full  relative bg-white rounded-xl Rounded-xl gap-4 
                    border transfrom duration-75 ease-in-out transform  hover:scale-105 shadow-xl"
          >
            <Link to="/book">
             {renderImage(room)}
              <h1 className="m-1 g-2 text-actText lg:text-xl md:text-xl text-sm font-semibold ">
                {room.room_name}
              </h1>
              <h2 className="m-1 g-2 text-darkText lg:text-xl md:text-xl text-sm">
              ₱ {room.price}
              </h2>
  
            </Link>
          </div>
        </div>
        ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
