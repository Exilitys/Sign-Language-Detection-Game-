import React from "react";
import hand from "./assets/Picture1.png";
import Button from "./component/button";
import Navigation from "./component/Navigation";
const Home = () => {
  return (
    <>
      <div className='flex-col'>
        <Navigation />

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
                <Button
                  content='Mulai Belajar'
                  backgroundStyle='bg-blue-200'
                  link='Camera'
                />
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
