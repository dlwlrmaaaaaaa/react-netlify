import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import room from "../JSON/Room.json";
import br1 from "../assets/br1.jpg";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import {
  FaCalendar,
  FaUsers,
  FaPlus,
  FaMinus,
  FaShieldAlt,
} from "react-icons/fa";
import {
  MdOutlineAccessTimeFilled,
  MdOutlineAccessTime,
  MdPlaylistAdd,
} from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

const Payment = () => {

  const initialOptions = {
    clientId: "test",
    currency: "PHP",
    intent: "capture",
};

  return (
    <>
      <Header />
      <div className="w-full grow bg-backColor h-auto flex flex-col justify-start items-center">
        {room.map((room) => (
          <>
            <div
              id="booking"
              className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 w-full h-auto"
              key={room.id}
            >
              <div
                id="left"
                className="col-span-2 p-3 gap-3 flex flex-col items-center h-auto"
              >
                <div
                  id="leftContainer"
                  className="flex flex-col  p-4 w-full h-full rounded-xl justify-between items-center"
                >
                  <div className="w-full flex flex-col sm:flex-col items-start justify-start gap-2 py-3">
                    {/* Description */}
                    <h1 className="text-4xl text-act-text font-bold text-actText">
                      Confirm and Pay
                    </h1>
                    <h1 className="text-3xl text-act-text font-bold text-notActText mt-4">
                      Your Reservation:
                    </h1>
                    <div className="flex w-full justify-between items-center mt-2">
                      <h1 className="text-2xl text-act-text font-semibold">
                        Dates
                      </h1>
                      <h1 className="text-lg text-act-text font-semibold">
                        Date - Date
                      </h1>
                      <h1 className="text-lg text-act-text font-semibold hover:underline duration-75 ease-in-out hover:scale-95">
                        <a href="">Edit</a>
                      </h1>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <h1 className="text-2xl text-act-text font-semibold">
                        Guest
                      </h1>
                      <h1 className="text-lg text-act-text font-semibold">
                        # Guest
                      </h1>
                      <h1 className="text-lg text-act-text font-semibold hover:underline duration-75 ease-in-out hover:scale-95">
                        <a href="">Edit</a>
                      </h1>
                    </div>
                    <div className="bg-mainBorder h-[3px] w-full mt-2"></div>

                    <h1 className="text-3xl text-act-text font-bold text-notActText mt-4">
                      Pay with:
                    </h1>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/GCash_logo.svg/1280px-GCash_logo.svg.png"
                      alt="Gcash"
                      className="h-8 mt-2"
                    />
                    <div className="bg-mainBorder h-[3px] w-full mt-2"></div>

                    <h1 className="text-3xl text-act-text font-bold text-notActText  mt-4">
                      Cancellation Policy
                    </h1>
                    <h1 className="text-lg text-act-text font-semibold">
                      Free Cancellation up to 24hrs before checkin
                    </h1>
                    <div className="bg-mainBorder h-[3px] w-full mt-2"></div>

                    <h1 className="text-3xl text-act-text font-bold text-notActText  mt-4">
                      Ground Rules
                    </h1>
                    <h1 className="text-lg text-act-text font-semibold">
                      We ask every guest to remember a few simple things about
                      what makes a great guest.
                    </h1>
                    <li>Follow the house rules</li>
                    <li>Treat your Host’s home like your own</li>
                    <div className="bg-mainBorder h-[3px] w-full mt-2"></div>
                    <h1 className="text-xs">
                      By confirming, I agree to the Host's House Rules, Ground
                      rules for guests,  JM Staycation Rebooking and Refund
                      Policy, and that  JM Staycation can charge my payment
                      method if I’m responsible for damage.
                    </h1>
                  </div>
                </div>
              </div>

              {/* booking bar */}
              <div id="right" className="p-2 flex mt-5 flex-col gap-4 h-auto">
                <div className="sticky top-24 mb-4">
                  <div className="bg-mainCol border-b-[1px] border-mainBorder mb-4 p-4 w-full h-auto rounded-xl flex flex-col justify-center items-center gap-6 shadow">
                    <div className="flex flex-row gap-5 container">
                      <div className="h-32 w-52">
                        <img
                          src={br1}
                          alt={room.title}
                          className="object-cover w-full lg:h-full h-[100px] rounded-xl"
                        />
                      </div>
                      <h1 className="lg:text-2xl text-md text-act-text font-bold text-actText mt-2">
                        {room.title}
                      </h1>
                    </div>

                    {/* cost computation */}
                    <div className="grid grid-cols-4 w-full mt-3">
                      <div className="col-span-3 flex flex-col gap-2">
                        <h1 className="text-sm font-semibold">
                          Cost Per Night
                        </h1>
                        <h1 className="text-sm font-semibold">
                          Number of Nights Staying
                        </h1>
                        <h1 className="text-sm font-semibold">
                          Additional Guest
                        </h1>
                        <h1 className="text-sm font-semibold">Total Cost</h1>
                        <h1 className="text-sm font-semibold">
                          Pay upon booking
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold ">
                          ₱ {room.price}
                        </h1>
                        <h1 className="text-sm font-semibold"># Night/s</h1>
                        <h1 className="text-sm font-semibold"># Guest/s</h1>
                        <h1 className="text-sm font-semibold"> ₱ Price</h1>
                        <h1 className="text-sm font-semibold">₱ Price</h1>
                      </div>
                    </div>
                  </div>

                  <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons style={{ layout: "horizontal" }} />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Payment;
