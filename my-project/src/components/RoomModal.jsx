import React, { useState, useEffect } from 'react'; // Import useState
import { Multiselect } from 'multiselect-react-dropdown';

const RoomModal = ({ closeModal, addNewRoom, roomToEdit, roomId, updateRoom, deleteRoom }) => {

  const roomAmenities = [
    { Amenities: 'Air-Condition', id: 1 },
    { Amenities: 'Unlimited Wifi', id: 2 },
    { Amenities: 'Smart TV/4k UHD', id: 3 },
    { Amenities: 'Board games', id: 4 },
    { Amenities: 'Double size bed with Pull out bed', id: 5 },
    { Amenities: 'Extra blanket', id: 6 },
    { Amenities: 'Bathroom towel', id: 7 },
    { Amenities: 'Shower Heater', id: 8 },
    { Amenities: 'Complete Kitchenware and Utensils', id: 9 },
    { Amenities: 'Refrigerator', id: 10 },
    { Amenities: 'Microwave', id: 11 },
    { Amenities: 'Rice Cooker', id: 12 },
    { Amenities: 'Induction Cooker', id: 13 },
    { Amenities: 'Electric Kettle', id: 14 },
    { Amenities: 'Free Coffee', id: 15 },
    { Amenities: 'Netflix and Karaoke', id: 16 },
    { Amenities: 'Game Cards', id: 17 }
  ]
  const [roomOptions] = useState(roomAmenities);

  const buildingAmenities = [,
    { Amenities: '🏊🏻‍♂️ Swimming Pool (adult & kids)', id: 1 },
    { Amenities: '🏀 Basketball Court', id: 2 },
    { Amenities: '🏋🏻 Gym ', id: 3 },
    { Amenities: '🏙️ Roof Deck', id: 4 },
    { Amenities: '🛝 Playground', id: 5 },
    { Amenities: '🛖 Gazebo', id: 6 },
    { Amenities: '🚬 Smoking Area', id: 7 },
    { Amenities: '🔥 Grill Pit', id: 8 }
  ]
  const [buildingOptions] = useState(buildingAmenities);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]); // Append new images to existing ones
  };
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedRoomAmenities, setSelectedRoomAmenities] = useState([]);
  const [selectedBuildingAmenities, setSelectedBuildingAmenities] = useState([]);

  useEffect(() => {
    if (roomToEdit) {
      setSelectedImages([roomToEdit.src]);
      setSelectedRoomAmenities(roomToEdit.roomAmenities || []);
      setSelectedBuildingAmenities(roomToEdit.buildingAmenities || []);
    } else {
      setSelectedImages([]); 
      setSelectedRoomAmenities([]);
      setSelectedBuildingAmenities([]);
    }
  }, [roomToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newRoomData = {
      title: formData.get('title'),
      price: formData.get('price'),
      address: formData.get('address'),
      miniDes: formData.get('miniDes'),
      description: formData.get('description'),
      roomAmenities: selectedRoomAmenities,
      buildingAmenities: selectedBuildingAmenities,
      src: selectedImages
    };

    if (roomId) {
      updateRoom(roomId, newRoomData);
    } else {
      addNewRoom(newRoomData);
    }

    closeModal();
  };

  const handleDelete = () => {
    deleteRoom(roomId);
    closeModal();
  };


  return (
    <div id='container' className='fixed top-0 left-0  w-full h-full bg-slate-300 bg-opacity-40 items-center justify-center flex' onClick={(e) => { if (e.target.id === "container") closeModal(); }}>
      <div id='modal' className='rounded-md p-3 bg-actNav w-5/6 h-5/6 overflow-auto scrollbar-thin scrollbar-webkit'>
        <h1 className='text-2xl font-bold mt-2'>Edit Room</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col justify-center items-center">
            <div className='flex flex-col justify-center items-center bg-white text-darkText rounded-xl border border-solid p-3 aspect-square w-40 cursor-pointer'>
              + Add Image <br />
              <span className='font-lighter text-sm'>Up to 10 Images</span>
              <input type='file' id='images' className='hidden' onChange={onSelectFile} multiple accept='image/jpg, image/jpeg, image/webp' />
            </div>
          </label>
          <div className='flex flex-wrap justify-center items-center mt-3'>
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className=''>
                    <img src={image} className='h-40 m-2' alt='upload' defaultValue={roomToEdit ? roomToEdit.image : ''} />
                    <button
                      className={'bg-notActText hover:bg-yellow-700 font-sm uppercase rounded-lg'}
                      onClick={() =>
                        setSelectedImages(selectedImages.filter((e) => e !== image))}
                    >
                      Delete Image
                    </button>
                  </div>
                )
              })}
          </div>
          <div className="relative p-6 flex-auto">
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1"> Title: </label>
                <input name="title" className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText" defaultValue={roomToEdit ? roomToEdit.title : ''} />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1"> Price: </label>
                <input name="price" className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText" defaultValue={roomToEdit ? roomToEdit.price : ''} />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1"> Address: </label>
                <input name="address" className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText" defaultValue={roomToEdit ? roomToEdit.address : ''} />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1"> Mini Description: </label>
                <input name="miniDes" className="shadow appearance-none border rounded w-full py-1 px-1 bg-white text-darkText" defaultValue={roomToEdit ? roomToEdit.miniDes : ''} />
              </div>
              <label className="block text-black text-sm font-semibold mt-1"> Description: </label>
              <textarea id='description'
                type="text"
                className='mt-2 bg-white text-darkText text-mg flex capitalize-first p-2 items-center justify-between shadow rounded-lg resize-none scrollbar-thin scrollbar-webkit'
                style={{ width: "100%", height: "100px", wordWrap: "break-word" }} defaultValue={roomToEdit ? roomToEdit.description : ''} />
            </div>

            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-black text-sm font-semibold mt-1"> Room Amenities: </label>
                <Multiselect
                id='roomAmenities'
                options={roomAmenities}
                selectedValues={selectedRoomAmenities} 
                onSelect={(selectedList) => setSelectedRoomAmenities(selectedList)}
                onRemove={(selectedList) => setSelectedRoomAmenities(selectedList)}
                displayValue='Amenities'
                className='shadow appearance-none border rounded w-full bg-white text-darkText'
              />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-black text-sm font-semibold mt-1"> Building Amenities: </label>
                <Multiselect
                id='buildingAmenities'
                options={buildingAmenities}
                selectedValues={selectedBuildingAmenities} 
                onSelect={(selectedList) => setSelectedBuildingAmenities(selectedList)}
                onRemove={(selectedList) => setSelectedBuildingAmenities(selectedList)}
                displayValue='Amenities'
                className='shadow appearance-none border rounded w-full bg-white text-darkText'
              />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-3 border-t border-solid border-darkText rounded-b">
            <button
              className="text-darkText background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={closeModal} > Close
            </button>

            {roomId && ( // Render delete button only if roomId exists
              <button
                className="text-white bg-red-500 active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleDelete}> Delete
              </button>
            )}
            <button
              className="text-white bg-notActText active:bg-yellow-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit" > Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

//oks na ADD EDIT DELETE
export default RoomModal