import React from "react";
import logo from '../assets/logo.png'

const Footer = () => {
  const Company = [
    { name: "About Us", src: "/home" },
    { name: "Legal Information", src: "/" },
    { name: "Contact Us", src: "/" },
    { name: "Blogs", src: "/" },
  ];
  const HelpCenter = [
    { name: "Find a Room", src: "/home" },
    { name: "How to Book?", src: "/" },
    { name: "Why Us?", src: "/" },
    { name: "FAQs", src: "/" },
  ];
  const ContactInfo = [
    { name: "Phone: 0961 202 7527" },
    { name: "Email: marucutjisselle@gmail.com" },
    { name: "Location: The Celandine , Quezon City, Philippines" }
  ];

  return (
    <div className="bg-white w-full h-auto border-t-2 border-actNav overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4">
            <img src={logo} className='object-contain w-48 m-7 lg:m-7' alt="Logo" />

            {/* 1st column */}
            <div className="w-full m-7 ">
                <h1 className='font-bold my-3 text-actText'>COMPANY</h1>
                {
                Company.map(company => (
                <div className='font-sm my-3'>
                    <a href={company.src} className='text-notActText'>{company.name}</a>
                </div>))
                }
            </div>

            {/* 2nd column */}
            <div className="w-full m-7 lg:ml-[-15px]">
                <h1 className='font-bold my-3 text-actText'>HELP CENTER</h1>
                {
                HelpCenter.map(helpCenter => (
                <div className='font-sm my-3'>
                    <a href={helpCenter.src} className='text-notActText'>{helpCenter.name}</a>
                </div>))
                }
            </div>
            
            {/* 3rd column */}
            <div className="w-full m-7 lg:ml-[-45px]">
                <h1 className='font-bold my-3 text-actText'>CONTACT INFO</h1>
                {
                ContactInfo.map(contactInfo => (
                <div className='font-sm my-3 max-w-[200px] lg:max-w-[300px]'>
                    <h1 className='text-notActText'>{contactInfo.name}</h1>
                </div>))
                }
            </div>
        </div>
      <div className='bg-actNav w-full h-[2px] mx-4'></div>
      <h1 className="font-bold text-sm text-notActText m-5 ml-10">© 2024 JM Staycation | All rights Reserved</h1>
    </div>
  );
  
};

export default Footer;