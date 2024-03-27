import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa";
import RoomModal from "../components/RoomModal";
import axiosClient from "../axios";
const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [data, setData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    axiosClient
      .get("/rooms")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        res.data.map((item) => setData((prev) => [...prev, item]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const roomImage = () => {
  //   const new_array = JSON.parse(item.file_name).slice(0, 1);

  //   return new_array.map((imageFileName, imageIndex) => (
  //     <img
  //       key={imageIndex}
  //       src={`http://localhost:8000/storage/images/${imageFileName}`}
  //       alt={`Room ${item.id} - Image ${imageIndex + 1}`}
  //       className="object-cover w-full h-3/4 rounded-xl"
  //     />
  //   ));
  // };

  return (
    <>
      <section className="w-4/5 grow bg-backColor h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4 scrollbar-thin scrollbar-webkit">
        <div className="flex flex-col bg-mainCol border-b-[1px] border-mainBorder p-4 w-full h-screen rounded-xl justify-between items-center shadow  overflow-y-auto scrollbar-thin scrollbar-webkit">
          <div className="w-full flex flex-col sm:flex-row items-start justify-start">
            <h1 className="text-2xl text-act-text font-semibold">
              Manage Rooms{" "}
            </h1>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 w-full h-screen mt-3 overflow-y-auto scrollbar-thin scrollbar-webkit">
            {data.map((item, index) => (
              <div
                id="rooms"
                className="featured flex justify-center cursor-pointer"
                key={index}
              >
                <div
                  id="roomEdit"
                  className="featured-item w-5/6 h-5/6 relative bg-white rounded-xl overflow-hidden Rounded-xl gap-5 
                 transition-transform transfrom hover:rotate-[-3deg] hover:scale-105  shadow"
                  key={index}
                >
                  <h1 className="m-1 g-2 text-actText font-semibold">
                    {item.room_name}
                  </h1>
                  <h2 className="m-1 g-2 text-darkText font-medium">
                    {parseFloat(item.price)}
                  </h2>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <div
                id="addNew"
                onClick={openModal}
                className="w-5/6 h-5/6 relative bg-white rounded-full flex flex-col items-center cursor-pointer justify-center hover:bg-darkText hover:text-white hover:opacity-75 "
              >
                <FaPlus size={50} />
                <h1 className="mt-2 font-semibold ">Add a New Room</h1>
              </div>
            </div>
            {isModalOpen && (
              <RoomModal
                closeModal={closeModal}
                // addNewRoom={addNewRoom}
                // roomToEdit={roomToEdit}
                // roomId={roomToEdit ? roomToEdit.id : null}
                // updateRoom={updateRoom}
                // deleteRoom={deleteRoom}
                // setData={setData} // Pass the setData function
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

//oks na ADD EDIT DELETE
export default Rooms;
