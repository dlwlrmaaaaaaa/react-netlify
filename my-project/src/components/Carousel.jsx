import { useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill  } from "react-icons/bs";

export default function Carousel({slides}) {

    const [current, setCurrent] = useState(0);

    const previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    const nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div className="overflow-hidden relative">

            {/* image */}
            <div className='flex transition ease-out duration-40' 
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}>
                {slides.map((s) => {
                    return <img
                    key={s.id}
                    src={s.src}
                    className="object-cover w-screen h-[550px]"
                />;
                })}
            </div>

            {/* Buttons */}
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl" >
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>

            {/* Navigation Circles */}
            <div className="absolute bottom-0 py-5 flex justify-center gap-4 w-full">
                {slides.map((s, i) => {
                    return (
                    <div 
                        onClick={() => {
                            setCurrent(i)
                        }}
                        key={"circle" + i}
                        className={`rounded-full h-4 w-4 cursor-pointer ${ i === current ? "bg-white" : "bg-gray-500"} `}></div>);
                })};
            </div>
        </div>
    );
}