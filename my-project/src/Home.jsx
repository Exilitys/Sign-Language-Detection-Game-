import React from "react";
import hand from "./assets/Picture1.png";
import Button from "./component/button";

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
          <div className='flex flex-col w-[60vw]'>
            <div className='text-6xl font-bold  items-center leading-normal'>
              Belajar Bahasa Isyarat dengan Cara Seru dan Interaktif!
            </div>
            <div className='text-2xl items-center'>
              Dengan teknologi AI, pelajari gerakan tangan dalam bahasa isyarat
              sambil bermain game interaktif. Cocok untuk pemula atau siapa saja
              yang ingin menguasai bahasa isyarat dengan mudah.
            </div>
            <div className='flex flex-row items-start mt-10 w-full justify-start gap-10 '>
              <div className>
                <Button content='Mulai Belajar' backgroundStyle='bg-blue-200' />
              </div>
              <div className=''>
                <Button
                  content='Learn more'
                  backgroundStyle='bg-transparent border-2 border-blue-200'
                />
              </div>
            </div>
          </div>

          <div className='items-center ml-12 '>
            <img src={hand}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
