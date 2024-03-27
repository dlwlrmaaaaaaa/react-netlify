import React, { useState, useEffect } from "react"; // Import useState
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
const RoomModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState(0);
  const [miniDes, setMiniDes] = useState("");
  const [description, setDescription] = useState("");
  const [roomAmenitiesData, setRoomAmenitiesData] = useState([]);
  const [buildingAmenitiesData, setBuildingAmenitiesData] = useState([]);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);
  const roomAmenities = [
    { Amenities: "Air-Condition" },
    { Amenities: "Unlimited Wifi" },
    { Amenities: "Smart TV/4k UHD" },
    { Amenities: "Board games" },
    { Amenities: "Double size bed with Pull out bed" },
    { Amenities: "Extra blanket" },
    { Amenities: "Bathroom towel" },
    { Amenities: "Shower Heater" },
    { Amenities: "Complete Kitchenware and Utensils" },
    { Amenities: "Refrigerator" },
    { Amenities: "Microwave" },
    { Amenities: "Rice Cooker" },
    { Amenities: "Induction Cooker" },
    { Amenities: "Electric Kettle" },
    { Amenities: "Free Coffee" },
    { Amenities: "Netflix and Karaoke" },
    { Amenities: "Game Cards" },
  ];
  // const [roomOptions] = useState(roomAmenities);

  const buildingAmenities = [
    ,
    { Amenities: "🏊🏻‍♂️ Swimming Pool (adult & kids)" },
    { Amenities: "🏀 Basketball Court" },
    { Amenities: "🏋🏻 Gym " },
    { Amenities: "🏙️ Roof Deck" },
    { Amenities: "🛝 Playground" },
    { Amenities: "🛖 Gazebo" },
    { Amenities: "🚬 Smoking Area" },
    { Amenities: "🔥 Grill Pit" },
  ];
  // const [buildingOptions] = useState(buildingAmenities);

  // const onSelectFile = (event) => {
  //   const selectedFiles = event.target.files;
  //   const selectedFilesArray = Array.from(selectedFiles);
  //   const imagesArray = selectedFilesArray.map((file) => {
  //     return URL.createObjectURL(file);
  //   });
  //   setSelectedImages((prevImages) => [...prevImages, ...imagesArray]); // Append new images to existing ones
  // };
  // const [selectedImages, setSelectedImages] = useState([]);

  // const [selectedRoomAmenities, setSelectedRoomAmenities] = useState([]);
  // const [selectedBuildingAmenities, setSelectedBuildingAmenities] = useState(
  //   []
  // );

  // useEffect(() => {
  //   if (roomToEdit) {
  //     setSelectedImages([roomToEdit.src]);
  //     setSelectedRoomAmenities(roomToEdit.roomAmenities || []);
  //     setSelectedBuildingAmenities(roomToEdit.buildingAmenities || []);
  //   } else {
  //     setSelectedImages([]);
  //     setSelectedRoomAmenities([]);
  //     setSelectedBuildingAmenities([]);
  //   }
  // }, [roomToEdit]);
  //

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "roomName":
        setRoomName(value);
        break;
      case "price":
        setPrice(parseFloat(value));
        break;
      case "miniDes":
        setMiniDes(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "roomAmenitiesData":
        setRoomAmenitiesData(value);
        break;
      case "buildingAmenitiesData":
        setBuildingAmenitiesData(value);
        break;
      default:
        break;
    }
  };

  const handleFileInputChange = (e) => {
    setFiles([]);
    const selectedFiles = Array.from(e.target.files);
    if (e.target.files) {
      const fileArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setImage((prevFiles) => [...prevFiles, ...selectedFiles]);
      setFiles((prev) => prev.concat(fileArray));
    }
  };

  const handleDeleteImage = (index) => {
    setImage([...files.slice(0, index), ...files.slice(index + 1)]);
  };

  const handleModal = () => {
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const files_image = e.target[0].files; // Assuming this is where you're retrieving the files from the file input

    const formData = new FormData();
    var datas = e.target[0].files;
    for (let i = 0; i < datas.length; i++) {
      formData.append("file_name[]", datas[i]);
    }
    formData.append("room_name", roomName);
    formData.append("price", price);
    formData.append("mini_description", miniDes);
    formData.append("description", description);
    formData.append("room_amenities", JSON.stringify(roomAmenitiesData));
    formData.append(
      "building_amenities",
      JSON.stringify(buildingAmenitiesData)
    );
    formData.append("file_name", files);

    try {
      axiosClient
        .post("http://localhost:8000/api/admin/add-room", formData)
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div
      id="container"
      className="fixed top-0 left-0  w-full h-full bg-slate-300 bg-opacity-40 items-center justify-center flex"
      onClick={(e) => {
        if (e.target.id === "container") closeModal();
      }}
    >
      <div
        id="modal"
        className="rounded-md p-3 bg-actNav w-5/6 h-5/6 overflow-auto scrollbar-thin scrollbar-webkit"
      >
        <h1 className="text-2xl font-bold mt-2">Edit Room</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white text-darkText rounded-xl border border-solid p-3 aspect-square w-40 cursor-pointer">
              + Add Image <br />
              <span className="font-lighter text-sm">Up to 10 Images</span>
              <input
                type="file"
                name="file_name[]"
                className="hidden"
                onChange={handleFileInputChange}
                multiple
                accept="image/jpg, image/jpeg, image/webp"
              />
            </div>
          </label>
          <div className="flex flex-wrap justify-center items-center mt-3">
            {image.map((image, index) => (
              <div key={index} className="m-2">
                <img
                  src={URL.createObjectURL(image)}
                  className="h-40"
                  alt={`Uploaded Image ${index}`}
                />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(index);
                  }}
                >
                  Delete Image
                </button>
              </div>
            ))}
          </div>
          <div className="relative p-6 flex-auto">
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Title:{" "}
                </label>
                <input
                  name="roomName"
                  className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText"
                  // defaultValue={roomToEdit ? roomToEdit.title : ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Price:{" "}
                </label>
                <input
                  name="price"
                  className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText"
                  // defaultValue={roomToEdit ? roomToEdit.price : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Address:{" "}
                </label>
                <input
                  name="address"
                  className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText"
                  // defaultValue={roomToEdit ? roomToEdit.address : ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Mini Description:{" "}
                </label>
                <input
                  name="miniDes"
                  className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText"
                  // defaultValue={roomToEdit ? roomToEdit.miniDes : ""}
                  onChange={handleChange}
                />
              </div>
              <label className="block text-black text-sm font-semibold mt-1">
                {" "}
                Description:{" "}
              </label>
              <textarea
                id="description"
                type="text"
                className="mt-2 bg-white text-darkText text-mg flex capitalize-first p-2 items-center justify-between shadow rounded-lg resize-none scrollbar-thin scrollbar-webkit"
                style={{
                  width: "100%",
                  height: "100px",
                  wordWrap: "break-word",
                }}
                onChange={handleChange}
                name="description"
                // defaultValue={roomToEdit ? roomToEdit.description : ""}
              />
            </div>

            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Room Amenities:{" "}
                </label>
                <MultiSelect
                  name="roomAmenitiesData"
                  value={roomAmenitiesData}
                  onChange={handleChange}
                  options={roomAmenities}
                  optionLabel="Amenities"
                  filter
                  placeholder="Select Amenities"
                  className="shadow appearance-none border rounded w-full bg-white text-darkText"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1">
                  {" "}
                  Building Amenities:{" "}
                </label>
                <MultiSelect
                  value={buildingAmenitiesData}
                  onChange={handleChange}
                  name="buildingAmenitiesData"
                  options={buildingAmenities}
                  optionLabel="Amenities"
                  filter
                  placeholder="Select Amenities"
                  className="shadow appearance-none border rounded w-full bg-white text-darkText"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-3 border-t border-solid border-darkText rounded-b">
            <button
              className="text-darkText background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleModal}
            >
              {" "}
              Close
            </button>

            {/* {roomId && ( // Render delete button only if roomId exists
              <button
                className="text-white bg-red-500 active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleDelete}
              >
                {" "}
                Delete
              </button>
            )} */}
            <button
              className="text-white bg-notActText active:bg-yellow-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
            >
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//oks na ADD EDIT DELETE
export default RoomModal;
