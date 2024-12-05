import React from "react";
import hand from "./assets/Picture1.png";
import Button from "./component/button";
import Navigation from "./component/Navigation";
import { BackgroundLines } from "./component/background-lines";
const Home = () => {
  return (
    <div className=' min-h-screen w-full  bg-white   bg-dot-black/[0.2] relative flex flex-col items-center '>
      <Navigation classNames='mt-10' />

      <div className='flex flex-row mx-52 my-5 mt-20 justify-start items-center '>
        <div className='flex flex-col w-[60vw]'>
          <div className='text-5xl font-bold  items-center lg:leading-normal lg:text-6xl md:text-5xl md:leading-normal'>
            Belajar Bahasa Isyarat dengan Cara Seru dan Interaktif!
          </div>
          <div className=' items-center my-5 text-lg md:text-xl lg:text-2xl'>
            Dengan teknologi AI, pelajari gerakan tangan dalam bahasa isyarat
            sambil bermain game interaktif. Cocok untuk pemula atau siapa saja
            yang ingin menguasai bahasa isyarat dengan mudah.
          </div>
          <div className='flex flex-col items-start mt-10 w-full justify-start gap-14  md:flex-row'>
            <div className>
              <Button
                content='Start Playing'
                backgroundStyle='bg-black text-white'
                link='Camera'
              />
            </div>
            <div className=''>
              <Button
                content='Learn more'
                backgroundStyle='bg-transparent border-2 border-black text-black'
                link='Learn'
              />
            </div>
          </div>
        </div>

        <div className='items-center ml-12 '>
          <img className='hidden lg:block' src={hand}></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
