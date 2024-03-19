import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa";
import br1 from "../assets/br1.jpg";
import br2 from "../assets/br2.jpg";
import RoomModal from "../components/RoomModal";

const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const updateRoom = (roomId, updatedRoomData) => {
    // Update the room data in the state
    setData(
      data.map((room) =>
        room.id === roomId ? { ...room, ...updatedRoomData } : room
      )
    );
  };

  const [data, setData] = useState([]);

  // const addNewRoom = (newRoom) => {
  //   setData([...data, { ...newRoom, id: data.length + 1 }]);
  // };

  // const deleteRoom = (roomId) => {
  //   // Filter out the room with the given roomId
  //   setData(data.filter((room) => room.id !== roomId));
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
            {data.map((room) => (
              <div
                id="rooms"
                className="featured flex justify-center"
                key={room.id}
              >
                <div
                  id="roomEdit"
                  className="featured-item w-5/6 h-5/6 relative bg-white rounded-xl overflow-hidden Rounded-xl gap-5 
                  transition-transform transfrom hover:rotate-[-3deg] hover:scale-105  shadow"
                >
                  <img
                    src={room.src}
                    className="object-cover w-full h-3/4 rounded-xl"
                    alt={room.title}
                  ></img>
                  <h1 className="m-1 g-2 text-actText font-semibold">
                    {room.title}
                  </h1>
                  <h2 className="m-1 g-2 text-darkText font-medium">
                    {room.price}
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
