import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className='flex flex-row gap-4 mx-10 text-xl my-10 justify-start items-start'>
      <div className='font-bold text-2xl w-[50vw]'>VISPA</div>
      <div className='w-[50vw] flex-row flex justify-end'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? "font-bold px-10 hover:opacity-50 cursor-pointer"
              : "px-10 hover:opacity-50 cursor-pointer"
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/Camera'
          className={({ isActive }) =>
            isActive
              ? "font-bold px-10 hover:opacity-50 cursor-pointer"
              : "px-10 hover:opacity-50 cursor-pointer"
          }
          activeClassName='font-bold'
        >
          Play
        </NavLink>
        <NavLink className='px-10 hover:opacity-50 cursor-pointer'>
          Learn
        </NavLink>
        <NavLink className='px-10 hover:opacity-50 cursor-pointer'>
          About Us
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
