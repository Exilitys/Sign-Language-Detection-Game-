import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ classNames }) => {
  return (
    <div
      className={`flex flex-row gap-4 mx-10 text-xl justify-start items-start ${classNames}`}
    >
      <div className='font-bold text-2xl w-[40vw]'>VISPA</div>
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
        >
          Play
        </NavLink>
        <NavLink
          to='/Learn'
          className={({ isActive }) =>
            isActive
              ? "font-bold px-10 hover:opacity-50 cursor-pointer"
              : "px-10 hover:opacity-50 cursor-pointer"
          }
        >
          Learn
        </NavLink>

        <NavLink
          to='/AboutUs'
          className={({ isActive }) =>
            isActive
              ? "font-bold px-10 hover:opacity-50 cursor-pointer"
              : "px-10 hover:opacity-50 cursor-pointer"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to='/Profile'
          className={({ isActive }) =>
            isActive
              ? "font-bold px-10 hover:opacity-50 cursor-pointer"
              : "px-10 hover:opacity-50 cursor-pointer"
          }
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
