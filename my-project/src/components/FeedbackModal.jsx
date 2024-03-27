import React, { useState } from 'react';
import room from '../JSON/Room.json';
import { FaCaretDown, FaEye } from "react-icons/fa";

const FeedbackModal = ({ closeModal }) => {

    // for image
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setSelectedImages((prevImages) => [...prevImages, ...imagesArray]); // Append new images to existing ones
    };
    const [selectedImages, setSelectedImages] = useState([]);

    const [selectedOption, setSelectedOption] = useState("Choose a Room");
    const [isActive, setIsActive] = useState(false);
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsActive(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        closeModal(); // Close modal after form submission
    };

    const [selectedRating, setSelectedRating] = useState(0);
    const handleRatingSelect = (rating, e) => {
        e.preventDefault();
        setSelectedRating(rating);
    };

    return (
        <div id='container' className='fixed top-0 left-0  w-full h-full bg-slate-300 bg-opacity-40 items-center justify-center flex' onClick={(e) => { if (e.target.id === "container") closeModal(); }}>
            <div id='modal' className='rounded-md p-3 bg-actNav w-5/6 h-5/6 overflow-auto scrollbar-thin scrollbar-webkit'>
                <h1 className='text-2xl font-bold mt-2'>Send us your Feedbacks!</h1>
                <form onSubmit={handleSubmit}>
                    
                    {/* add image */}
                    <label className="flex flex-col justify-center items-center">
                        <div className='flex flex-col justify-center items-center bg-white text-darkText rounded-xl border border-solid p-3 aspect-square w-40 cursor-pointer'>
                            + Add Image <br />
                            <span className='font-lighter text-sm'>Up to 10 Images</span>
                            <input type='file' id='images' className='hidden' onChange={onSelectFile} multiple accept='image/jpg, image/jpeg, image/webp' />
                        </div>
                    </label>
                    
                    {/* show and delete image */}
                    <div className='flex flex-wrap justify-center items-center mt-3'>
                        {selectedImages &&
                            selectedImages.map((image, index) => {
                                return (
                                    <div key={image} className=''>
                                        <img src={image} className='h-40 m-2' alt='upload' defaultValue='upload' />
                                        <button
                                            className={'bg-notActText hover:bg-yellow-700 font-sm uppercase rounded-lg'}
                                            onClick={() =>
                                                setSelectedImages(selectedImages.filter((e) => e !== image))} >
                                            Delete Image
                                        </button>
                                    </div>
                                )
                            })}
                    </div>

                    {/* input */}
                    <div className="relative p-6 flex-auto">
                        <div className="flex flex-col">
                            
                            {/* dropdown */}
                            <label className="block text-black text-sm font-semibold mt-2"> Room: </label>
                            <div className="dropdown relative">
                                <div className=" bg-white text-darkText text-mg flex font-bold mt-2 p-2 items-center justify-between shadow rounded-xl"
                                    onClick={() => setIsActive(!isActive)}>
                                    {selectedOption} <FaCaretDown />
                                </div>
                                {isActive && (
                                    <div className="dropdownContent text-darkText w-full p-2 border-b-[1px] border-mainBorder bg-white mt-1 rounded-xl absolute  overflow-y-auto scrollbar-thin scrollbar-webkit">
                                        {room.map(roomItem => (
                                            <div key={roomItem.id} onClick={() => handleOptionSelect(roomItem.title)} className="dropdownItem mt-1 hover:bg-actNav cursor-pointer">
                                                {roomItem.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* ratings */}
                            <label className="block text-black text-sm font-semibold mt-3"> Rating: </label>
                            <div className='grid grid-cols-5 mt-2 gap-3'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        className={`bg-white rounded-lg p-3 hover:scale-95 duration-75 ${selectedRating == value ? 'scale-95 bg-hoverCirlce' : ''}`}
                                        onClick={(e) => handleRatingSelect(value, e)}
                                        value={value} >
                                        {Array(value).fill('⭐').join('')}
                                    </button>
                                ))}
                            </div>

                            {/* message */}
                            <label className="block text-black text-sm font-semibold mt-3"> Message: </label>
                            <textarea id='description'
                                type="text"
                                className='mt-2 bg-white text-darkText text-mg flex capitalize-first p-2 items-center justify-between shadow rounded-lg resize-none scrollbar-thin scrollbar-webkit'
                                style={{ width: "100%", height: "100px", wordWrap: "break-word" }} />
                        </div>
                    </div>

                    {/* buttons */}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-darkText rounded-b">
                        <button
                            className="text-darkText background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={closeModal}  > Close
                        </button>
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

export default FeedbackModal