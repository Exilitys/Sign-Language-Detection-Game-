import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ backgroundStyle, content, link }) => {
  return (
    <NavLink
      to={link}
      className={` px-10 py-5 hover:opacity-50 cursor-pointer rounded-xl ${backgroundStyle}`}
    >
      {content}
    </NavLink>
  );
};

export default Button;
