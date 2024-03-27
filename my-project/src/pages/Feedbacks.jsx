import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ratings from '../JSON/Ratings.json';
import { FaCircleUser } from 'react-icons/fa6';
import { FaPlus } from "react-icons/fa";
import FeedbackModal from '../components/FeedbackModal';

const Feedbacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };

  return (
    <>
    <Header />
    <div className='w-full grow bg-backColor h-auto flex flex-col justify-start items-center'>
        <h1 className='text-actText text-4xl font-bold m-5 py-5'>Overall Ratings</h1>
        {ratings.map(rating => (
            <>

            {/* rating infos */}
            <div className='bg-mainBorder h-[3px] w-full mt-2 mb-2'></div>
            <div className='flex justify-start items-start mb-3 w-full overflow-x-auto' key={rating.id}>
                <FaCircleUser size={30} className='mt-2 ml-6'/>
                <div className='flex flex-col justify-start items-start px-3'>
                    <h1 className='mt-2 text-md font-semibold'>{rating.name}</h1>
                    <h1 className=''>{rating.stars}</h1>
                    <h1 className='text-sm'>{rating.date} | {rating.room}</h1>
                    <h1 className='mt-2'>{rating.message}</h1>
                    
                    {/* rating image */}
                    <div className='flex flex-row gap-2 w-full justify-start items-start py-4 mb-4'>
                        {rating.images.map(image => (
                        <div className='flex justify-center' key={image.id}>
                            <div className='h-32 w-32 relative  rounded-xl border transform duration-75 ease-in-out hover:scale-105 shadow-xl'>
                                <img src={image.src} className='object-cover w-full h-full rounded-xl' alt={image.id} />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
        ))}
        
        <div className='sticky mb-5 bottom-5 right-5'>
            <button onClick={toggleModal} className='rounded-full bg-actNav p-4 transform duration-75 ease-in-out hover:scale-125'><FaPlus size={30}/></button>
        </div>
        {isModalOpen && 
           <FeedbackModal 
           closeModal={toggleModal} 
            />
        }
    </div>
    <Footer />
    </>
  )
}

export default Feedbacks