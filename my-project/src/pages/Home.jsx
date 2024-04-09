import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import br1 from "../assets/br1.jpg";
import br2 from "../assets/br2.jpg";
import { Link } from "react-router-dom";

import rooms from "../JSON/Room.json";
import { useStateContext } from "../contexts/contextProvider";

const Home = () => {
  const {token} = useStateContext();
  if(!token){
    return <Navigate to="/login"/>
  }
  // Mapping identifiers to actual image imports
  const imageMap = {
    br1: br1,
    br2: br2,
  };
  useEffect(() => {
    console.log(token);
  }, token)

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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

        <div id="availableRooms" className="flex items-center justify-center border-actNav">
          <h1 className="text-actText text-4xl font-bold m-5">
            Available Rooms
          </h1>
        </div>

        {/* room map tiles */}
        <div className="grid lg:grid-cols-3 grid-cols-2 mt-3 justify-center">
          {rooms.map((room) => (
            <div id="rooms" className="flex justify-center" key={room.id}>
              <div
                id="roomEdit"
                className="w-5/6 h-5/6 relative bg-white rounded-xl Rounded-xl gap-4 
                        border transfrom duration-75 ease-in-out transform  hover:scale-105 shadow-xl"
              >
                <Link to="/book">
                  <img
                    src={imageMap[room.src]}
                    className="object-cover w-full h-3/4 rounded-xl"
                    alt={room.title}
                  ></img>
                  <h1 className="m-1 g-2 text-actText lg:text-lg md:text-md font-semibold ">
                    {room.title}
                  </h1>
                  <h2 className="m-1 g-2 text-darkText font-medium">
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
