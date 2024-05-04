import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ratings from "../JSON/Ratings.json";
import { FaCircleUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import FeedbackModal from "../components/FeedbackModal";
import axiosClient from "../axios";

const Feedbacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/review/roomName")
            .then((res) => {
                return res.data.data;
            })
            .then((res) => {
                setOptions(res);
                setLoading(false);
                // console.log(res);
            })
            .catch((Err) => console.log(Err));
    }, []); // Ensure it runs only once after the initial render

    const getReviews = () => {
        setLoading(true);
        axiosClient
            .get("/review/reviews")
            .then((res) => {
                return res.data;
            })
            .then((res) => {
                const sortedData = res.data;
                setData(sortedData);
                setLoading(false);
                console.log(sortedData);
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(() => {
            setLoading(true);
        }, 3000);
    };

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>
            <Header />
            <div className="w-full grow bg-backColor h-auto flex flex-col justify-start items-center">
                <h1 className="text-actText text-4xl font-bold m-5 py-5">
                    Overall Ratings
                </h1>
                {/* rating infos */}
                <div className="bg-mainBorder h-[3px] w-full mt-2 mb-2"></div>
                {loading &&
                    data.map((item, index) => (
                        <>
                            <div className="flex justify-start items-start mb-3 w-full overflow-x-auto">
                                {/* <FaCircleUser size={30} className="mt-2 ml-6" /> */}
                                <img src={`http://localhost:8000${item.avatar}`}  alt="Avatar" className="w-12 h-12 rounded-full ml-4 mt-2" />
                                <div className="flex flex-col justify-start items-start px-3">
                                    <div key={index}>
                                        <h1 className="mt-2 text-md font-semibold">{item.name}</h1>
                                        <h1 className="">{Array(item.rating).fill('⭐').join('')}</h1>
                                        <h1 className="text-sm">
                                            {item.date_sent} | {item.room_name}
                                        </h1>
                                        <h1 className="mt-2">{item.comment}</h1>
                                    </div>
                                    <div className="flex flex-row gap-2 w-full justify-start items-start py-4 mb-4">
                                        <div className="flex justify-center">
                                            <div className="h-32 w-32 relative  rounded-xl border transform duration-75 ease-in-out hover:scale-105 shadow-xl">
                                                <img
                                                    src={item.src}
                                                    className="object-cover w-full h-full rounded-xl"
                                                    alt={item.id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-mainBorder h-[3px] w-full mt-2 mb-2"></div>
                        </>
                    ))}

                <div className="sticky mb-5 bottom-5 right-5">
                    {loading && (
                        <button
                            onClick={toggleModal}
                            className="rounded-full bg-actNav p-4 transform duration-75 ease-in-out hover:scale-125"
                        >
                            <FaPlus size={30} />
                        </button>
                    )}
                </div>
                {isModalOpen && (
                    <FeedbackModal closeModal={toggleModal} option2={options} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default Feedbacks;
