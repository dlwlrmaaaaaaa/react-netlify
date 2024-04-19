import React from "react";
import { FaUser } from "react-icons/fa";
import { FaHouse, FaRegCalendarCheck } from "react-icons/fa6";
import { Navigate } from "react-router-dom";
import Rooms from "./Rooms";
import { useStateContext } from "../contexts/contextProvider";

const Dashboard = () => {
  const tableData = [
    {
      id: "0001",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Cancelled",
    },
    {
      id: "0002",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Closed",
    },
    {
      id: "0001",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Cancelled",
    },
    {
      id: "0002",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Closed",
    },
    {
      id: "0001",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Cancelled",
    },
    {
      id: "0002",
      room: "1 Bedroom unit with Balcony facing Amenities",
      date: "April 18-25",
      status: "Closed",
    },
  ];
  const reviewsData = [
    {
      name: "Dan Edward Manuel",
      review: "GandaGandaGandaGanda GandaGandaGandaGandaGandaGandaGanda",
    },
    {
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const statusColors = {
    "status-cancelled": "#FFD2D2",
    "status-closed": "#D2E3FC",
  };

  return (
    <>
      <section className="w-4/5 grow bg-backColor h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4 scrollbar-thin scrollbar-webkit">
        <div
          id="main-section"
          className="grid lg:grid-cols-3 grid-cols-1 gap-4 w-full h-screen"
        >
          <div
            id="left"
            className="col-span-2 p-3 gap-3 flex flex-col justify-between items-center h-full"
          >
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 w-full mb-2">
              <div
                className="w-full flex flex-col items-center justify-center bg-mainCol border-b-[1px] border-mainBorder p-2 rounded-xl gap-5 
                transition-transform transfrom hover:rotate-[-5deg] hover:scale-105 shadow"
              >
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-md text-act-text font-semibold">Rooms</h1>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="text-3xl text-black font-semibold">2</h1>
                    <p className="text-slate-700">Current Rooms</p>
                  </div>
                  <div className="bg-cirlce hover:bg-hoverCirlce cursor-pointer text-black p-3 rounded-full">
                    <FaHouse className="w-[30px] h-[30px]" />
                  </div>
                </div>
              </div>
              <div
                className="w-full flex flex-col items-center justify-center bg-mainCol border-b-[1px] border-mainBorder p-2 rounded-xl gap-5 
                transition-transform transfrom hover:rotate-[-5deg] hover:scale-105 shadow"
              >
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-md text-act-text font-semibold">
                    Reservations
                  </h1>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="text-3xl text-black font-semibold">2</h1>
                    <p className="text-slate-700">Reservations</p>
                  </div>
                  <div className="bg-cirlce hover:bg-hoverCirlce cursor-pointer text-black p-3 rounded-full">
                    <FaRegCalendarCheck className="w-[30px] h-[30px]" />
                  </div>
                </div>
              </div>

              <div
                className="w-full flex flex-col items-center justify-center bg-mainCol border-b-[1px] border-mainBorder p-2 rounded-xl gap-5 
                transition-transform transfrom hover:rotate-[-5deg] hover:scale-105 shadow"
              >
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-md text-act-text font-semibold">Users</h1>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="text-3xl text-black font-semibold">2</h1>
                    <p className="text-slate-700">Current Users</p>
                  </div>
                  <div className="bg-cirlce hover:bg-hoverCirlce cursor-pointer text-black p-3 rounded-full">
                    <FaUser className="w-[30px] h-[30px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-mainCol border-b-[1px] border-mainBorder p-4 w-full h-full rounded-xl flex-col justify-center items-center gap-6 shadow">
              <h1 className="text-2xl text-act-text font-semibold">
                Recent Reservations
              </h1>
              <div
                id="table"
                className="p-7 h-full mt-1 rounded-xl"
                style={{ maxHeight: "85%" }}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b-[1px] border-hoverCirlce">
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        No.
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Room
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Date
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hoverCirlce">
                    {tableData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b-[1px] border-hoverCirlce hover:bg-actNav cursor-pointer"
                      >
                        <td className="p-3 text-sm text-gray-700">
                          <a
                            href="#"
                            className="font-bold text-darkText hover:underline"
                          >
                            {row.id}
                          </a>
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {row.room}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {row.date}
                        </td>
                        <td
                          className={`p-3 text-sm justify-center items-center text-gray-700 rounded-3xl`}
                          style={{
                            backgroundColor:
                              statusColors[
                                `status-${row.status.toLowerCase()}`
                              ],
                          }}
                        >
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h1
                id="reserSee"
                className="text-sm text-black font-semibold flex justify-end mt-2"
              >
                <a href="#" className="font-bold text-darkText hover:underline">
                  See More
                </a>
              </h1>
            </div>
          </div>

          <div
            id="right"
            className="p-2 flex flex-col justify-center items-center gap-4 h-screen"
          >
            <div className="bg-mainCol border-b-[1px] border-mainBorder p-4 w-full h-full rounded-xl flex-col justify-center items-center gap-6 shadow">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl text-act-text font-semibold mb-1">
                  Recent Feedbacks
                </h1>
              </div>
              <div
                className="overflow-y-auto container scrollbar-thin scrollbar-webkit "
                style={{ maxHeight: "90%" }}
              >
                {reviewsData.map((review, index) => (
                  <div
                    key={index}
                    id="reviews"
                    className="bg-backColor hover:bg-actNav rounded-md w-full overflow-wrap flex-col justify-start items-center gap-2 mt-2 p-2"
                  >
                    <h1 className="text-xl text-darkText font-semibold">
                      {review.name}
                    </h1>
                    <p className="text-slate-700 break-words">
                      {review.review}
                    </p>
                  </div>
                ))}
              </div>
              <h1 className="text-sm font-semibold flex justify-end mt-2">
                <a href="#" className="font-bold text-darkText hover:underline">
                  See More
                </a>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
