import React from "react";
import hand from "./assets/Picture1.png";

const Home = () => {
  return (
    <>
      <div className='flex-col'>
        <div className='flex flex-row gap-4 mx-10 text-xl my-10 justify-start items-start'>
          <div className='font-bold text-2xl w-[50vw]'>VISPA</div>
          <div className='w-[50vw] flex-row flex justify-end'>
            <div className='px-10 font-bold hover:opacity-50 cursor-pointer'>
              Home
            </div>
            <div className='px-10 hover:opacity-50 cursor-pointer'>Play</div>
            <div className='px-10 hover:opacity-50 cursor-pointer'>Learn</div>
            <div className='px-10 hover:opacity-50 cursor-pointer'>
              About Us
            </div>
          </div>
        </div>

        <div className='flex flex-row mx-52 my-20 justify-start items-center'>
          <div className='flex flex-col w-[60vw] items-center'>
            <div className='text-6xl font-bold  items-center leading-normal'>
              Belajar Bahasa Isyarat dengan Cara Seru dan Interaktif!
            </div>
            <div className='text-2xl items-center'>
              Dengan teknologi AI, pelajari gerakan tangan dalam bahasa isyarat
              sambil bermain game interaktif. Cocok untuk pemula atau siapa saja
              yang ingin menguasai bahasa isyarat dengan mudah.
            </div>
          </div>

          <div className='items-center ml-12'>
            <img src={hand}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
